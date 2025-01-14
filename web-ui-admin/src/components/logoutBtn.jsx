import React from "react";
import { removeToken } from "../services/auth";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      removeToken();
      navigate("/");
      alert("Logged out successfully!");
    } catch (error) {
      // console.error("Error during logout:", error);
      alert("Logout failed. Please try again.");
    }
  };

  return (

      <button className="btn-signout" onClick={handleLogout}>
        Logout
      </button>

  );
};

export default Logout;
