import React, { useState } from "react";
import API from "../services/api";

const EditUserForm = ({ user, onClose, onUpdate }) => {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  const [partnerId, setPartnerId] = useState(user.partner_id);
  const [isActive, setIsActive] = useState(user.isActive);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`user/edit-user`, {
        id:user.id,
        username,
        email,
        role,
        partner_id: partnerId,
        isActive,
      });
      alert("User updated successfully!");
      onUpdate();
      onClose();
    } catch (error) {
console.log("err = " ,error);
      alert("Failed to update user: ");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <select value={role} onChange={(e) => setRole(e.target.value)} required>
        <option value="user">User</option>
        <option value="partner">Partner</option>
        <option value="admin">Admin</option>
      </select>
      <input
        type="number"
        placeholder="Partner ID"
        value={partnerId}
        onChange={(e) => setPartnerId(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
        />
        Active
      </label>
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditUserForm;