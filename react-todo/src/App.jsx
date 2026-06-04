import React, { useState, useEffect } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import TodoFilters from './components/TodoFilters';
import StatsDashboard from './components/StatsDashboard';

export default function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('aura_react_todos');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [filter, setFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('aura_react_todos', JSON.stringify(todos));
  }, [todos]);

  // Operations
  const handleAddTodo = ({ text, priority, category }) => {
    const newTodo = {
      id: Date.now().toString(),
      text,
      priority,
      category,
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const handleToggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const handleUpdateTodo = (id, updatedFields) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updatedFields } : t))
    );
  };

  const handleClearCompleted = () => {
    setTodos((prev) => prev.filter((t) => !t.completed));
  };

  // Filter & Search Logic
  const filteredTodos = todos
    .filter((todo) => {
      // 1. Status Filter
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
      return true;
    })
    .filter((todo) => {
      // 2. Category Filter
      if (categoryFilter === 'all') return true;
      return todo.category === categoryFilter;
    })
    .filter((todo) => {
      // 3. Search Query Filter
      if (!searchQuery.trim()) return true;
      return todo.text.toLowerCase().includes(searchQuery.toLowerCase());
    });

  // Sorting logic:
  // 1. Completed tasks sink to the bottom.
  // 2. For active tasks, sort by Priority (High -> Medium -> Low).
  // 3. Within the same priority / completion level, sort by creation date (newest first).
  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    
    // If both are incomplete, sort by priority
    if (!a.completed) {
      const priorityWeight = { high: 3, medium: 2, low: 1 };
      const diff = priorityWeight[b.priority] - priorityWeight[a.priority];
      if (diff !== 0) return diff;
    }

    // Default tie breaker: creation date descending
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const hasCompleted = todos.some((t) => t.completed);

  return (
    <>
      <div className="react-bg-mesh">
        <div className="mesh-circle mesh-circle-1"></div>
        <div className="mesh-circle mesh-circle-2"></div>
      </div>

      <main className="react-app-wrapper">
        {/* Header */}
        <header className="react-header">
          <div className="logo-box">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
          </div>
          <div className="logo-info">
            <h1>AuraTodo React</h1>
            <p>Advanced state-driven task board</p>
          </div>
        </header>

        {/* Stats Dashboard */}
        <StatsDashboard todos={todos} />

        {/* Content Board */}
        <div className="react-glass-card">
          <TodoForm onAdd={handleAddTodo} />
          
          <TodoFilters
            filter={filter}
            setFilter={setFilter}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            hasCompleted={hasCompleted}
            onClearCompleted={handleClearCompleted}
          />

          <ul className="react-todo-list">
            {sortedTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={handleToggleTodo}
                onDelete={handleDeleteTodo}
                onUpdate={handleUpdateTodo}
              />
            ))}
          </ul>

          {sortedTodos.length === 0 && (
            <div className="react-empty-state">
              <div className="react-empty-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3>No matching tasks</h3>
              <p>Try resetting filters or searching for something else.</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
