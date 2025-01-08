import React, { useState, useEffect } from "react";
import API from "../services/api";
import EditUserForm from "../components/EditUserForm";

const ManagePage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await API.get("user/list");
        setUsers(response.data);
      } catch (error) {
        alert("Failed to fetch users list");
      }
    };
    fetchUsers();
  }, []);

  const handleUpdate = () => {
    setSelectedUser(null);
    const fetchUsers = async () => {
      try {
        const response = await API.get("user/list");
        setUsers(response.data);
      } catch (error) {
        alert("Failed to fetch users list");
      }
    };
    fetchUsers();
  };

  return (
    <div>
      <h1>Manage Users</h1>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Partner ID</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.partner_id}</td>
              <td>{user.isActive ? "Yes" : "No"}</td>
              <td>
                <button onClick={() => setSelectedUser(user)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedUser && (
        <EditUserForm
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default ManagePage;