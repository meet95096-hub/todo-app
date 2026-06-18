import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) return null;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/dashboard" className="nav-brand">
            <LayoutDashboard color="#60a5fa" />
            <span>MyApp</span>
          </Link>
          <div className="nav-links">
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <Link to="/profile" className="nav-link">Profile</Link>
          </div>
        </div>
        
        <div className="nav-user">
          <div className="user-info">
            {user?.image ? (
              <img src={user.image} alt="User" className="avatar" />
            ) : (
              <div className="avatar">
                <User size={16} />
              </div>
            )}
            <span>Hi, {user?.firstName || 'User'}</span>
          </div>
          <button onClick={handleLogout} className="btn btn-danger">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
