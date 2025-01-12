import { useNavigate } from "react-router-dom";
import API from "../services/api"
import React, { useEffect, useState } from 'react';

const ChangePassword = () => {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "password") {
            setPassword(value.trim());
        } else if (name === "newPassword") {
            setNewPassword(value.trim());
        }
    };
    const navigate = useNavigate();
    const handleChangePassword = async () => {
        
        if (password ==="") {
            alert("Password must not empty");
            return;
        }
        if (newPassword ==="") 
            {
                alert("newPassword must not empty");
                return;
            }

        if (newPassword === password) {
            alert("New password must be different from last one");
            return;
        }

        try {
            await API.put(`user/change-password`, {
                password: password,
                newPassword: newPassword,
            });
            alert("Password changed successfully!");
            setPassword("");
            setNewPassword("");
        } catch (error) {
            console.error("Error during Change Password:", error);
            alert("Change Password failed. Please try again.");
        }
    }
    return (

        <aside className="profile-card align-center">
            <h1>Change Password</h1>
            <table>
                <thead>

                </thead>
            <tbody>
            <tr>
                    <td className="noborder">
                        <label>
                            Password:
                        </label>
                    </td>
                    <td className="noborder">
                        <input
                            className="edit-info"
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleInputChange}
                            placeholder="Enter your current password"
                            required
                        />

                    </td>
                </tr>
                <tr>
                    <td className="noborder">
                        <label>
                            New Password:
                        </label>
                    </td>
                    <td className="noborder">
                        <input
                            className="edit-info"
                            type="password"
                            name="newPassword"
                            value={newPassword}
                            onChange={handleInputChange}
                            placeholder="Enter your new password"
                            required
                        />
                    </td>
                </tr>
            </tbody>

            </table>
<div>
<button className="btn-change-password" onClick={handleChangePassword}>
                Change Password
            </button>
            <button className="btn-cancel" onClick={()=>navigate("/")}>
                Cancel
            </button>
</div>
        </aside>

    );
};


export default ChangePassword;