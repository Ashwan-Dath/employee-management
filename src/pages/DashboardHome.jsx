import { useEmployee } from '../context/EmployeeContext';
import { Users, UserCheck, UserX } from 'lucide-react';

const DashboardHome = () => {
  const { employees } = useEmployee();

  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(e => e.active).length;
  const inactiveEmployees = totalEmployees - activeEmployees;

  const StatCard = ({ title, count, icon: Icon, color, bgColor }) => (
    <div className="stat-card" style={{ borderLeft: `4px solid ${color}` }}>
      <div className="stat-content">
        <h3 className="stat-title">{title}</h3>
        <p className="stat-count" style={{ color: color }}>{count}</p>
      </div>
      <div className="stat-icon" style={{ backgroundColor: bgColor, color: color }}>
        <Icon size={24} />
      </div>
    </div>
  );

  return (
    <div className="dashboard-home">
      <div className="stats-grid">
        <StatCard
          title="Total Employees"
          count={totalEmployees}
          icon={Users}
          color="#6366f1"
          bgColor="#e0e7ff"
        />
        <StatCard
          title="Active Employees"
          count={activeEmployees}
          icon={UserCheck}
          color="#16a34a"
          bgColor="#dcfce7"
        />
        <StatCard
          title="Inactive Employees"
          count={inactiveEmployees}
          icon={UserX}
          color="#9ca3af"
          bgColor="#f3f4f6"
        />
      </div>

      <div className="welcome-section">
        {/* <h3>Welcome To Dashboard</h3>
        <p>Manage your employees efficiently.</p> */}
        <h3>Welcome to Your Dashboard</h3>
        <p>Easily manage and monitor your employees.</p>

        <div className="recent-activity">
          {/* Could add recent added employees here if needed */}
        </div>
      </div>


    </div>
  );
};

export default DashboardHome;
