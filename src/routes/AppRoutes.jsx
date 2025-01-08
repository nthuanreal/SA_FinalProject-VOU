import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage.jsx";
import ProfilePage from "../pages/ProfilePage";
import ManagePage from "../pages/ManagePage";
import { getRoleFromToken } from "../services/auth";

const ProtectedRoute = ({ children, roles }) => {
  const userRole = getRoleFromToken();
  if (!userRole) return <Navigate to="/login" />;
  if (roles && !roles.includes(userRole)) return <Navigate to="/access-denied" />;
  return children;
};

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={
          <ProtectedRoute roles={['user', 'partner', 'admin']}>
            <ProfilePage />
          </ProtectedRoute>
        } />
        <Route path="/manage" element={
          <ProtectedRoute roles={['admin']}>
            <ManagePage/>
          </ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}
