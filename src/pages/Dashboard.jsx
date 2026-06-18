import { useAuth } from '../context/AuthContext';
import { Users, Activity, CreditCard, DollarSign } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Welcome back, {user?.firstName} {user?.lastName}!</p>
      </div>

      <div className="dashboard-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(96, 165, 250, 0.1)', color: '#60a5fa' }}>
            <Users size={24} />
          </div>
          <div className="stat-info">
            <h3>Total Users</h3>
            <p>1,234</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(52, 211, 153, 0.1)', color: '#34d399' }}>
            <Activity size={24} />
          </div>
          <div className="stat-info">
            <h3>Active Sessions</h3>
            <p>892</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(248, 113, 113, 0.1)', color: '#f87171' }}>
            <CreditCard size={24} />
          </div>
          <div className="stat-info">
            <h3>Active Subscriptions</h3>
            <p>456</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'rgba(167, 139, 250, 0.1)', color: '#a78bfa' }}>
            <DollarSign size={24} />
          </div>
          <div className="stat-info">
            <h3>Monthly Revenue</h3>
            <p>$12,400</p>
          </div>
        </div>
      </div>
      
      <div className="glass-card" style={{ marginTop: '2rem', maxWidth: '100%' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>Recent Activity</h2>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          <p style={{ padding: '1rem 0', borderBottom: '1px solid var(--border)' }}>Logged in from new device (IP: 192.168.1.1) - 2 hours ago</p>
          <p style={{ padding: '1rem 0', borderBottom: '1px solid var(--border)' }}>Updated profile information - 1 day ago</p>
          <p style={{ padding: '1rem 0' }}>Changed password - 2 weeks ago</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
