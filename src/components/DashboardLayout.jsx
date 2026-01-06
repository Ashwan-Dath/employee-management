import { useAuth } from '../context/AuthContext';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { Users, LogOut, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path;

    return (
        <div className="dashboard-container">
            <aside className="sidebar">
                <div className="sidebar-header">
                    <h2>EMS</h2>
                    <span className="version">v1.0</span>
                </div>

                <nav className="sidebar-nav">
                    <Link to="/" className={`nav-item ${isActive('/') ? 'active' : ''}`}>
                        <LayoutDashboard size={20} />
                        <span>Dashboard</span>
                    </Link>
                    <Link to="/employees" className={`nav-item ${isActive('/employees') ? 'active' : ''}`}>
                        <Users size={20} />
                        <span>Employees</span>
                    </Link>
                </nav>

                <div className="sidebar-footer">
                    <button onClick={handleLogout} className="logout-btn">
                        <LogOut size={18} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            <main className="main-content">
                <header className="top-bar">
                    <h2 className="page-title">
                        {location.pathname === '/' ? 'Dashboard' : 'Employee Management'}
                    </h2>
                    <div className="user-profile">
                        <div className="avatar">
                            {user?.name?.charAt(0) || 'A'}
                        </div>
                        <div className="user-info">
                            <span className="user-name">{user?.name}</span>
                            <span className="user-role">{user?.role}</span>
                        </div>
                    </div>
                </header>

                <div className="content-area">
                    <Outlet />
                </div>
            </main>

            <style jsx>{`
        .dashboard-container {
          display: flex;
          min-height: 100vh;
          background-color: var(--bg-color);
        }
        .sidebar {
          width: 260px;
          background-color: var(--surface-color);
          border-right: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          position: fixed;
          height: 100vh;
          z-index: 10;
        }
        .sidebar-header {
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          border-bottom: 1px solid var(--border-color);
        }
        .sidebar-header h2 {
          margin: 0;
          color: var(--primary-color);
          font-size: 1.5rem;
        }
        .version {
          font-size: 0.75rem;
          background: var(--bg-color);
          padding: 0.1rem 0.4rem;
          border-radius: 10px;
          color: var(--text-secondary);
        }
        .sidebar-nav {
          padding: 1.5rem 1rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .nav-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          color: var(--text-secondary);
          text-decoration: none;
          border-radius: var(--radius-md);
          font-weight: 500;
          transition: all 0.2s;
        }
        .nav-item:hover, .nav-item.active {
          background-color: #e0e7ff;
          color: var(--primary-color);
        }
        .sidebar-footer {
          padding: 1rem;
          border-top: 1px solid var(--border-color);
        }
        .logout-btn {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          width: 100%;
          padding: 0.75rem 1rem;
          background: none;
          border: none;
          color: var(--danger-color);
          font-weight: 500;
          border-radius: var(--radius-md);
          transition: background 0.2s;
        }
        .logout-btn:hover {
          background-color: #fee2e2;
        }
        
        .main-content {
          flex: 1;
          margin-left: 260px;
          display: flex;
          flex-direction: column;
        }
        .top-bar {
          height: 64px;
          background: var(--surface-color);
          border-bottom: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2rem;
          position: sticky;
          top: 0;
          z-index: 5;
        }
        .page-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-main);
          margin: 0;
        }
        .user-profile {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .avatar {
          width: 36px;
          height: 36px;
          background: var(--primary-color);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
        }
        .user-info {
          display: flex;
          flex-direction: column;
        }
        .user-name {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-main);
        }
        .user-role {
          font-size: 0.75rem;
          color: var(--text-secondary);
          text-transform: capitalize;
        }
        .content-area {
          padding: 2rem;
          overflow-y: auto;
          flex: 1;
        }
      `}</style>
        </div>
    );
};

export default DashboardLayout;
