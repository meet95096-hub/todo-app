// Select DOM elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoPriority = document.getElementById('todo-priority');
const todoList = document.getElementById('todo-list');
const filterBtns = document.querySelectorAll('.filter-btn');
const clearCompletedBtn = document.getElementById('clear-completed');
const emptyState = document.getElementById('empty-state');

// Stats DOM elements
const statsCounter = document.getElementById('stats-counter');
const statsPercentage = document.getElementById('stats-percentage');
const progressBar = document.getElementById('progress-bar');

// Application State
let todos = [];
let currentFilter = 'all';

// Initialize App
function init() {
  // Load todos from localStorage
  const savedTodos = localStorage.getItem('aura_todos');
  if (savedTodos) {
    try {
      todos = JSON.parse(savedTodos);
    } catch (e) {
      todos = [];
    }
  }

  // Set initial event listeners
  todoForm.addEventListener('submit', handleAddTodo);
  clearCompletedBtn.addEventListener('click', handleClearCompleted);
  
  // Filter tabs listeners
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      currentFilter = e.target.getAttribute('data-filter');
      renderTodos();
    });
  });

  // Initial render
  renderTodos();
}

// Save to LocalStorage
function saveTodos() {
  localStorage.setItem('aura_todos', JSON.stringify(todos));
}

// Recalculate stats
function updateStats() {
  const total = todos.length;
  const completed = todos.filter(t => t.completed).length;
  
  statsCounter.textContent = `${completed}/${total} Tasks`;
  
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
  statsPercentage.textContent = `${percentage}%`;
  progressBar.style.width = `${percentage}%`;

  // Enable/disable clear completed button
  clearCompletedBtn.disabled = completed === 0;
}

// Add a new Todo
function handleAddTodo(e) {
  e.preventDefault();
  
  const text = todoInput.value.trim();
  const priority = todoPriority.value;
  
  if (!text) return;
  
  const newTodo = {
    id: Date.now().toString(),
    text,
    priority,
    completed: false,
    createdAt: new Date().toISOString()
  };
  
  todos.unshift(newTodo); // Add to beginning of array
  saveTodos();
  todoInput.value = '';
  todoInput.focus();
  
  renderTodos();
}

// Delete a Todo with sliding animation
function handleDeleteTodo(id) {
  const todoElement = document.querySelector(`[data-id="${id}"]`);
  if (todoElement) {
    todoElement.classList.add('removing');
    // Wait for the slideOut animation to finish (300ms)
    todoElement.addEventListener('animationend', (e) => {
      if (e.animationName === 'slideOut') {
        todos = todos.filter(t => t.id !== id);
        saveTodos();
        renderTodos();
      }
    });
  } else {
    todos = todos.filter(t => t.id !== id);
    saveTodos();
    renderTodos();
  }
}

// Toggle Todo completion status
function handleToggleTodo(id) {
  todos = todos.map(t => {
    if (t.id === id) {
      return { ...t, completed: !t.completed };
    }
    return t;
  });
  saveTodos();
  
  // Rerender after a small delay to allow checkbox check-state animation to feel natural
  setTimeout(() => {
    renderTodos();
  }, 180);
}

// Clear all completed todos
function handleClearCompleted() {
  // Select all completed items and animate them
  const completedItems = document.querySelectorAll('.todo-item.completed');
  if (completedItems.length === 0) return;

  completedItems.forEach(item => {
    item.classList.add('removing');
  });

  // Once animations are finished, update state and render
  setTimeout(() => {
    todos = todos.filter(t => !t.completed);
    saveTodos();
    renderTodos();
  }, 300);
}

// Render Todos list based on filter
function renderTodos() {
  todoList.innerHTML = '';
  
  // Filter logic
  let filteredTodos = todos;
  if (currentFilter === 'active') {
    filteredTodos = todos.filter(t => !t.completed);
  } else if (currentFilter === 'completed') {
    filteredTodos = todos.filter(t => t.completed);
  }
  
  // Sort logic: incomplete tasks stay at the top, completed tasks go to bottom.
  // Within both categories, they are sorted by creation date descending.
  filteredTodos.sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  // Empty state handling
  if (filteredTodos.length === 0) {
    emptyState.style.display = 'flex';
  } else {
    emptyState.style.display = 'none';
  }

  // Create and append list items
  filteredTodos.forEach(todo => {
    const li = document.createElement('li');
    li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
    li.setAttribute('data-id', todo.id);

    // Build the checkbox template
    const checkboxId = `chk-${todo.id}`;
    
    li.innerHTML = `
      <div class="todo-item-left">
        <label class="checkbox-container" for="${checkboxId}">
          <input type="checkbox" id="${checkboxId}" ${todo.completed ? 'checked' : ''}>
          <span class="checkmark"></span>
        </label>
        <span class="todo-text">${escapeHtml(todo.text)}</span>
        <span class="priority-badge ${todo.priority}">${todo.priority}</span>
      </div>
      <button class="btn-delete" aria-label="Delete todo" data-delete-id="${todo.id}">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-1.816A2.25 2.25 0 0013.81 2H10.19a2.25 2.25 0 00-2.25 2.25v1.816m-3 0h11.218" />
        </svg>
      </button>
    `;

    // Event listener for checkbox
    const checkbox = li.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', () => handleToggleTodo(todo.id));

    // Event listener for delete button
    const deleteBtn = li.querySelector('.btn-delete');
    deleteBtn.addEventListener('click', () => handleDeleteTodo(todo.id));

    todoList.appendChild(li);
  });

  updateStats();
}

// Utility function to escape HTML output and prevent XSS
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

// Run init on window load
document.addEventListener('DOMContentLoaded', init);
