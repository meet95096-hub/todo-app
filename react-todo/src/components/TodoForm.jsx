import React, { useState } from 'react';

export default function TodoForm({ onAdd }) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('Work');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    
    onAdd({
      text: text.trim(),
      priority,
      category,
    });
    
    setText('');
    setPriority('medium');
    setCategory('Work');
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="input-grid">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
          required
          maxLength={80}
          className="todo-input"
        />
        <div className="input-options">
          <div className="select-wrapper">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="option-select"
              title="Category"
            >
              <option value="Work">💻 Work</option>
              <option value="Personal">🏠 Personal</option>
              <option value="Shopping">🛒 Shopping</option>
              <option value="Fitness">💪 Fitness</option>
              <option value="Other">✨ Other</option>
            </select>
          </div>

          <div className="select-wrapper">
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="option-select"
              title="Priority"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>

          <button type="submit" className="btn-add-todo" aria-label="Add task">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </div>
      </div>
    </form>
  );
}
