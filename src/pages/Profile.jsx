import { useAuth } from '../context/AuthContext';
import { Mail, User, Shield } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 64px)', padding: '2rem 1rem' }}>
      <div style={{ 
        width: '100%', 
        maxWidth: '500px', 
        background: '#1b202c', 
        borderRadius: '16px', 
        padding: '3rem 2.5rem',
        boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
        border: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2.5rem' }}>
          {user?.image ? (
            <img src={user.image} alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '50%', marginBottom: '1.25rem', background: '#252d3a' }} />
          ) : (
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: '#252d3a', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <User size={48} color="#94a3b8" />
            </div>
          )}
          <h2 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#ffffff', marginBottom: '0.25rem' }}>{user?.firstName} {user?.lastName}</h2>
          <p style={{ color: '#3b82f6', fontSize: '1rem' }}>{user?.username}</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.25rem', background: '#232936', borderRadius: '12px' }}>
            <Mail color="#94a3b8" size={24} style={{ flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem', fontWeight: '600' }}>Email Address</p>
              <p style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: '500' }}>{user?.email}</p>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.25rem', background: '#232936', borderRadius: '12px' }}>
            <User color="#94a3b8" size={24} style={{ flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem', fontWeight: '600' }}>Full Name</p>
              <p style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: '500' }}>{user?.firstName} {user?.lastName}</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.25rem', background: '#232936', borderRadius: '12px' }}>
            <Shield color="#94a3b8" size={24} style={{ flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem', fontWeight: '600' }}>Role</p>
              <p style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: '500' }}>Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
