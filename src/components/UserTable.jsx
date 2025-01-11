import React, { useState } from "react";
import API from "../services/api";

const UserTable = ({ currentUsers }) => {
  const [editingUserId, setEditingUserId] = useState(null); 
  const [editedUser, setEditedUser] = useState(null); 



  const handleEdit = (user) => {
    setEditingUserId(user.id);
    setEditedUser({ ...user }); // Tạo bản sao user để chỉnh sửa
  };

  const handleSave = async () => {
    try {
      console.log(editedUser)
       await API.put(`user/edit-user`, {
        id: editingUserId,
        username: editedUser.username,
        email: editedUser.email,
        role: editedUser.role,
        partner_id: editedUser.partner_id,
        isActive: editedUser.isActive,
      });
      setEditedUser(null);
      setEditingUserId(null)
      alert("User updated successfully!");
    } catch (error) {
      console.log("err = " ,error);
      alert("Failed to update user: ");
    }
  };


  const handleCancel = () => {
    setEditingUserId(null);
    setEditedUser(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
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
                  <td>
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
                      type="text"
                      name="partner_id"
                      value={editedUser.partner_id}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <select
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
                    <button className="save-user" type="submit" onClick={handleSave}>
                      Save
                    </button>
                    <button className="cancel-user" onClick={handleCancel}>
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="user-info">{user.username}</td>
                  <td className="user-info">{user.email}</td>
                  <td className="user-info">{user.role}</td>
                  <td className="user-info">{user.partner_id}</td>
                  <td style={{ color: user.isActive ? "green" : "red" }}>
                    {user.isActive ? "Active" : "Inactive"}
                  </td>
                  <td>
                    <button className="edit-user" onClick={() => handleEdit(user)}>
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
