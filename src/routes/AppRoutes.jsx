import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage.jsx";
import ProfilePage from "../pages/ProfilePage";
import DashboardPage from "../pages/DashboardPage";
import { getRoleFromToken, getToken, removeToken } from "../services/auth";
import ChangePassword from "../components/changePassword.jsx";
import UnderConstruction from "../components/UnderConstruction.jsx"
import APIserviceFactory from "../services/api.js";
const ProtectedRoute = ({ children, roles }) => {
  const userRole = getRoleFromToken();
  if (!userRole) return <Navigate to="/login" />;
  if (roles && !roles.includes(userRole)) return <Navigate to="/access-denied" />;
  return children;
};


const fetchProfile = async () => {
  const { data } = await APIserviceFactory.userService.get("user/profile");
  return data;
};

const Validate = ()=>{
    return fetchProfile()? true:false;
}

const AuthRoute = ({children}) => {
  const token = getToken();
    if (token) {
      console.log("validate: ", Validate())
      const userRole = getRoleFromToken();
      if (!userRole || !Validate()) {
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
        <Route path="/" element={<Navigate to ="/login"/>}/>
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

        <Route path="/changePassword" element ={
          <ProtectedRoute roles = { ['user','partner','admin']}>
            <ChangePassword />
          </ProtectedRoute>
        }
        />

        <Route path="/dashboard" element={
          <ProtectedRoute roles={['admin']}>
            <DashboardPage/>
          </ProtectedRoute>
        } />

        <Route path="/404-not-found" element={
            <UnderConstruction/>
        } />
        <Route path="*" element={<Navigate to="/404-not-found" />} />
      </Routes>
    </Router>
  );
}
