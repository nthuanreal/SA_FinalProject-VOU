import React, { useState } from "react";
import APIserviceFactory from "../services/api";
import { getRoleFromToken, saveToken } from "../services/auth";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const API = APIserviceFactory.userService;
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/login", { username, password });
      saveToken(data.access_token);
      const role = await getRoleFromToken();
      if(role !="admin")
      {
        navigate("/profile");
      }else{
        navigate("/dashboard");
      }
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <>
      <div className="glass-container">
        <div className="login-box">
          <h2 className="form-title">Login</h2>
          <form onSubmit={handleLogin}>

            <input
              type="text"
              id="username"
              name="username"
              required
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="options">
              <a href="#">Forgot Password?</a>
            </div>
            <button type="submit">Login</button>

            <p>Don't have an account? <a href="/register" id="register">Register</a></p>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
