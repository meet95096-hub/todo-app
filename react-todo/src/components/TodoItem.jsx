import React, { useState, useRef, useEffect } from 'react';

export default function TodoItem({ todo, onToggle, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (editText.trim() && editText.trim() !== todo.text) {
      onUpdate(todo.id, { text: editText.trim() });
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  return (
    <li className={`todo-row-item ${todo.completed ? 'completed' : ''} priority-${todo.priority}`}>
      <div className="todo-item-main">
        {/* Animated Custom Checkbox */}
        <label className="custom-chk-container" htmlFor={`chk-react-${todo.id}`}>
          <input
            type="checkbox"
            id={`chk-react-${todo.id}`}
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
          />
          <span className="chk-checkmark"></span>
        </label>

        {/* Text Area (View or Edit Input) */}
        <div className="todo-content-block">
          {isEditing ? (
            <input
              type="text"
              ref={inputRef}
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={handleSave}
              onKeyDown={handleKeyDown}
              maxLength={80}
              className="edit-todo-input"
            />
          ) : (
            <span className="todo-row-text" onDoubleClick={() => setIsEditing(true)}>
              {todo.text}
            </span>
          )}
          
          {/* Badges Container */}
          <div className="badges-row">
            <span className={`badge priority-tag ${todo.priority}`}>
              {todo.priority}
            </span>
            <span className="badge category-tag">
              {todo.category}
            </span>
          </div>
        </div>
      </div>

      {/* Row Operations */}
      <div className="todo-row-actions">
        {!todo.completed && (
          <button
            onClick={() => {
              if (isEditing) {
                handleSave();
              } else {
                setIsEditing(true);
              }
            }}
            className="action-btn edit-btn"
            aria-label="Edit task"
            title="Edit task"
          >
            {isEditing ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="icon">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="icon">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.83 20.013a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
              </svg>
            )}
          </button>
        )}
        <button
          onClick={() => onDelete(todo.id)}
          className="action-btn delete-btn"
          aria-label="Delete task"
          title="Delete task"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="icon">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-1.816A2.25 2.25 0 0013.81 2H10.19a2.25 2.25 0 00-2.25 2.25v1.816m-3 0h11.218" />
          </svg>
        </button>
      </div>
    </li>
  );
}
