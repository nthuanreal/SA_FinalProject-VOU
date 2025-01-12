
import React, { useEffect, useState } from "react";
import API from "../services/api";
import UserTable from "./UserTable";

const UserManagement = () => {

  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const fetchUsers = async () => {
    const { data } = await API.get("user/list");
    setUsers(data);
  };
  useEffect(() => {
    fetchUsers();
  },[]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Tổng số trang
  const totalPages = Math.ceil(users.length / usersPerPage);

  // Chuyển đến trang khác
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const updateUserInList = () => {
    fetchUsers();
  };

  return (
    <div>
      <h2>User Management</h2>
      <UserTable currentUsers={currentUsers}  updateUserInList={updateUserInList}/>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};



export default UserManagement;