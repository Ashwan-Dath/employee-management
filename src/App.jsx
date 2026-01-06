import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/PrivateRoute';
import DashboardLayout from './components/DashboardLayout';
import { EmployeeProvider } from './context/EmployeeContext';
import EmployeeList from './pages/EmployeeList';
import EmployeeForm from './pages/EmployeeForm';
import DashboardHome from './pages/DashboardHome';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route element={<PrivateRoute />}>
            <Route path="/" element={
              <EmployeeProvider>
                <DashboardLayout />
              </EmployeeProvider>
            }>
              <Route index element={<DashboardHome />} />
              <Route path="employees" element={<EmployeeList />} />
              <Route path="employees/add" element={<EmployeeForm />} />
              <Route path="employees/edit/:id" element={<EmployeeForm />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
