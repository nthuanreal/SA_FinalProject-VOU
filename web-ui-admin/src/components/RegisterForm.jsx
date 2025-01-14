import React, { useState } from "react";
import APIserviceFactory from "../services/api";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const API = APIserviceFactory.userService;
  const handleRegister = async (e) => {
    e.preventDefault();
    setUsername(username.trim());
    try {
      await API.post("auth/register", { username, password });
      alert("Registration successful!");
      
      navigate("/login");
    } catch (error) {
      alert("Registration failed: "+ error.response.data.message);
    }
  };

  return (
    <>
    <div className="glass-container">
      <div className="login-box">
        <h2 className = "form-title">Register</h2>
        <form onSubmit={handleRegister}>

          <input
            type="text"
            id="username"
            name="username"
            required
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            maxLength={50} 
          />

          <input
            type="password"
            id="password"
            name="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value.trim())}
            maxLength={50} 
          />

          <div className="options">
          </div>
          <button type="submit">Register</button>

          <p>Already have an account? <a className="login-register-link" onClick={()=>{navigate("/login")}} id="register">Login</a>.</p>
        </form>
      </div>
    </div>
  </>
  );
};

export default RegisterForm;