import React, { useEffect, useState } from "react";
import API from "../services/api";

const AdminManage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await API.get("/list");
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setSelectedUser(user);
  };

  const handleSubmitEdit = async (updatedUser) => {
    try {
      await API.put("user/edit-user", updatedUser);
      alert("User updated successfully");
      setSelectedUser(null);
    } catch (error) {
      alert("Update failed");
    }
  };

  return (
    <div>
      <h1>User Management</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} - {user.role}
            <button onClick={() => handleEdit(user)}>Edit</button>
          </li>
        ))}
      </ul>
      {selectedUser && (
        <EditUserForm user={selectedUser} onSubmit={handleSubmitEdit} />
      )}
    </div>
  );
};

const EditUserForm = ({ user, onSubmit }) => {
  const [username, setUsername] = useState(user.username);
  const [role, setRole] = useState(user.role);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ id: user.id, username, role });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit">Save</button>
    </form>
  );
};

export default AdminManage;
