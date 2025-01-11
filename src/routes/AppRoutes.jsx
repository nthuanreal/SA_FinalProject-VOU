import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage.jsx";
import ProfilePage from "../pages/ProfilePage";
import DashboardPage from "../pages/DashboardPage";
import { getRoleFromToken, getToken, removeToken } from "../services/auth";

const ProtectedRoute = ({ children, roles }) => {
  const userRole = getRoleFromToken();
  if (!userRole) return <Navigate to="/login" />;
  if (roles && !roles.includes(userRole)) return <Navigate to="/access-denied" />;
  return children;
};

const AuthRoute = ({children}) => {
  const token = getToken();
    if (token) {
      const userRole = getRoleFromToken();
      if (!userRole) {
        removeToken();
        return <Navigate to="/login" />;
      }
      if (userRole =="admin") 
        return <Navigate to="/dashboard" />;
      else
        return <Navigate to="/profile" />
    }
  return children;
};

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          <AuthRoute>
            <LoginPage />
          </AuthRoute>

        } />
        <Route path="/register" element={
          <AuthRoute>
            <RegisterPage />
          </AuthRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute roles={['user', 'partner', 'admin']}>
            <ProfilePage />
          </ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute roles={['admin']}>
            <DashboardPage/>
          </ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}
