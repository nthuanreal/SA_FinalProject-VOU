import React, { useState } from "react";
import APIserviceFactory from "../services/api";
import { getInfoFromToken } from "../services/auth";

const UserTable = ({ currentUsers, updateUserInList }) => {
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUser, setEditedUser] = useState(null);
  const API = APIserviceFactory.userService;


  const handleEdit = (user) => {
    setEditingUserId(user.id);
    setEditedUser({ ...user }); // Tạo bản sao user để chỉnh sửa
  };

  const handleSave = async () => {
    const admin = getInfoFromToken();
    if (editingUserId === admin.id) {
      alert("Failed to update admin ");
      setEditedUser(null);
      setEditingUserId(null)
      return;
    }
    if (!editedUser.username) {
      alert("Failed to update user: username must not empty! ");
      setEditedUser(null);
      setEditingUserId(null);
      return;
    }
    try {
      await API.put(`user/edit-user`, {
        id: editingUserId,
        username: editedUser.username,
        email: editedUser.email|| " ",
        role: editedUser.role,
        partner_id: editedUser.partner_id,
        isActive: editedUser.isActive,
      });
      updateUserInList();
      setEditedUser(null);
      setEditingUserId(null)
      alert("User updated successfully!");

    } catch (error) {
      console.error("err = ", error);
      alert("Failed to update user: ");
    }
  };


  const handleCancel = () => {
    setEditingUserId(null);
    setEditedUser(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "partner_id") {
      setEditedUser((prev) => ({ ...prev, [name]: Number(value) }));
    }
    else if (name === "email" && value === " ") {
      setEditedUser((prev) => ({
        ...prev,
        [name]: " "
      }));
    } else {
      setEditedUser((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Email</th>
          <th>Role</th>
          <th>Partner ID</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {currentUsers.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            {editingUserId === user.id ? (
              <>
                <td >
                  <input
                    className="edit-info"
                    type="text"
                    name="username"
                    required
                    value={editedUser.username}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <input
                    className="edit-info"
                    type="email"
                    name="email"
                    value={editedUser.email}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <select
                    className="edit-info"
                    name="role"
                    value={editedUser.role}
                    onChange={(e) =>
                      setEditedUser((prev) => ({
                        ...prev,
                        role: e.target.value,
                      }))
                    }
                  >
                    <option value="admin">Admin</option>
                    <option value="partner">Partner</option>
                    <option value="user">User</option>
                  </select>
                </td>
                <td>
                  <input
                    className="edit-info"
                    type="number"
                    name="partner_id"
                    value={editedUser.role === "partner" ? editedUser.partner_id : 0}
                    onChange={handleInputChange}
                  />
                </td>
                <td>
                  <select
                    className="edit-info"
                    name="isActive"
                    value={editedUser.isActive}
                    onChange={(e) =>
                      setEditedUser((prev) => ({
                        ...prev,
                        isActive: e.target.value === "true",
                      }))
                    }
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </td>
                <td className="double-button">
                  <button className="btn-save" type="submit" onClick={handleSave}>
                    Save
                  </button>
                  <button className="btn-cancel" onClick={handleCancel}>
                    Cancel
                  </button>
                </td>
              </>
            ) : (
              <>
                <td className="user-info">{user.username}</td>
                <td className="user-info">{user.email}</td>
                <td className="user-info">{user.role}</td>
                <td className="user-info">{user.role === "partner" ? user.partner_id : 0}</td>
                <td style={{ color: user.isActive ? "green" : "red" }}>
                  {user.isActive ? "Active" : "Inactive"}
                </td>
                <td>
                  <button className="btn-edit" onClick={() => handleEdit(user)}>
                    Edit
                  </button>
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;