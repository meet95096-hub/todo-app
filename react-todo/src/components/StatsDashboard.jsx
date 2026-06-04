import React from 'react';

export default function StatsDashboard({ todos }) {
  const total = todos.length;
  const completed = todos.filter(t => t.completed).length;
  const active = total - completed;

  const lowPriority = todos.filter(t => t.priority === 'low' && !t.completed).length;
  const mediumPriority = todos.filter(t => t.priority === 'medium' && !t.completed).length;
  const highPriority = todos.filter(t => t.priority === 'high' && !t.completed).length;

  const completionPercentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  // SVG Circular progress configurations
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (completionPercentage / 100) * circumference;

  return (
    <div className="stats-dashboard-card">
      <div className="dashboard-grid">
        {/* Left Side: Circular SVG Loader */}
        <div className="dashboard-circular-progress">
          <svg className="progress-ring" width="90" height="90">
            <circle
              className="progress-ring-bg"
              stroke="rgba(255, 255, 255, 0.05)"
              strokeWidth="6"
              fill="transparent"
              r={radius}
              cx="45"
              cy="45"
            />
            <circle
              className="progress-ring-bar"
              stroke="url(#purpleGradient)"
              strokeWidth="6"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              r={radius}
              cx="45"
              cy="45"
            />
            <defs>
              <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#c084fc" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
          <div className="percentage-display">
            <span className="percent-num">{completionPercentage}%</span>
            <span className="percent-label">Done</span>
          </div>
        </div>

        {/* Middle Side: Main stats */}
        <div className="dashboard-main-counters">
          <div className="counter-item">
            <span className="counter-val">{total}</span>
            <span className="counter-lbl">Total Tasks</span>
          </div>
          <div className="counter-item">
            <span className="counter-val text-completed">{completed}</span>
            <span className="counter-lbl">Completed</span>
          </div>
          <div className="counter-item">
            <span className="counter-val text-active">{active}</span>
            <span className="counter-lbl">Active</span>
          </div>
        </div>

        {/* Right Side: Priority distributions (active tasks only) */}
        <div className="dashboard-priority-distribution">
          <div className="priority-dist-row">
            <span className="dist-indicator low"></span>
            <span className="dist-name">Low:</span>
            <span className="dist-count">{lowPriority} active</span>
          </div>
          <div className="priority-dist-row">
            <span className="dist-indicator medium"></span>
            <span className="dist-name">Med:</span>
            <span className="dist-count">{mediumPriority} active</span>
          </div>
          <div className="priority-dist-row">
            <span className="dist-indicator high"></span>
            <span className="dist-name">High:</span>
            <span className="dist-count">{highPriority} active</span>
          </div>
        </div>
      </div>
    </div>
  );
}
