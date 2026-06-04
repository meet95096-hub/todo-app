import React from 'react';

export default function TodoFilters({
  filter,
  setFilter,
  categoryFilter,
  setCategoryFilter,
  searchQuery,
  setSearchQuery,
  hasCompleted,
  onClearCompleted
}) {
  return (
    <div className="filters-container">
      {/* Search Input */}
      <div className="search-bar-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="search-icon">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search tasks..."
          className="search-input"
        />
      </div>

      {/* Filter Options Row */}
      <div className="filters-row">
        {/* Status Filters */}
        <div className="status-filters">
          <button
            onClick={() => setFilter('all')}
            className={`filter-tab-btn ${filter === 'all' ? 'active' : ''}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`filter-tab-btn ${filter === 'active' ? 'active' : ''}`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`filter-tab-btn ${filter === 'completed' ? 'active' : ''}`}
          >
            Completed
          </button>
        </div>

        {/* Dropdown Filters & Actions */}
        <div className="secondary-filters">
          <div className="category-select-wrapper">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="category-filter-select"
              title="Filter by Category"
            >
              <option value="all">All Categories</option>
              <option value="Work">💻 Work</option>
              <option value="Personal">🏠 Personal</option>
              <option value="Shopping">🛒 Shopping</option>
              <option value="Fitness">💪 Fitness</option>
              <option value="Other">✨ Other</option>
            </select>
          </div>

          <button
            onClick={onClearCompleted}
            disabled={!hasCompleted}
            className="clear-completed-btn"
          >
            Clear Completed
          </button>
        </div>
      </div>
    </div>
  );
}
