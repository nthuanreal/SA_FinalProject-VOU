
import React, { useEffect, useState } from "react";
import { getInfoFromToken } from "../services/auth";
import Logout from "./logoutBtn";
import { useNavigate } from "react-router-dom";
import  API  from "../services/api";

const UserProfile = () => {
  const [data, setData] = useState({ username: "", email: "", role: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ username: "", email: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const getInfo = async () => {
      try {
        const userdata = await getInfoFromToken();
        setData({ username: userdata.username, email: userdata.email, role: userdata.role });
        setEditData({ username: userdata.username, email: userdata.email });
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/login");
      }
    };
    getInfo();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const saveEditProfile = async () => {
    if(editData.username ==""){
      alert("Failed to update profile. Please try again.");
      setIsEditing(false);
      return;
    }
    try {
      await API.put(`/user/edit-profile`, {
        username: editData.username.trim(),
        email: editData.email.trim(),
      });
      alert("Profile updated successfully!");
      setData(editData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to update profile. Please try again.");
      setIsEditing(false);

    }
  };

  return (
    <aside className="profile-card">
      <header>
        <img src="/user-avatar.png" alt="User Avatar" />
        {isEditing ? (
          <div>
            <input
            className="edit-info"
              type="text"
              name="username"
              value={editData.username}
              onChange={handleInputChange}
              required
              placeholder="Enter new username"
            />
          </div>
        ) : (
          <h1>{data.username}</h1>
        )}
        <h2>{data.role}</h2>
      </header>
      <div className="profile-bio">
        <p>
          Email:{" "}
          {isEditing ? (
            <input
            className="edit-info"
              type="email"
              name="email"
              value={editData.email}
              onChange={handleInputChange}
              placeholder="Enter new email"
            />
          ) : (
            data.email
          )}
        </p>
        <div>
          <button
            className="btn-change-password"
            onClick={() => navigate("/changePassword")}
          >
            Edit Password
          </button>
          {isEditing ? (
            <button className="btn-save-profile" onClick={saveEditProfile}>
              Save
            </button>
          ) : (
            <button className="btn-change-password" onClick={handleEditProfile}>
              Edit Profile
            </button>
          )}
          <Logout />
        </div>
      </div>
    </aside>
  );
};

export default UserProfile;

