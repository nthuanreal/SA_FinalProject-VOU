
import React, { useEffect, useState } from "react";
import APIserviceFactory from "../services/api";
import UserTable from "./UserTable";

const UserManagement = () => {
  const API = APIserviceFactory.userService;
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const fetchUsers = async () => {
    const { data } = await API.get("user/list");
    setUsers(data);
  };
  useEffect(() => {
    fetchUsers();
  }, []);

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
      <h2 className='dashboard-title'>USER MANAGEMENT</h2>
      <UserTable currentUsers={currentUsers} updateUserInList={updateUserInList} />
      <div className="pagination">
        {/* First Page Button */}
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          {"<<"}
        </button>

        {/* Previous Page Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>

        {/* Page Numbers */}
        {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
        let page;
          // Xử lý khi currentPage nằm ở đầu dải
          if (currentPage <= 3) {
            page = index + 1; // Hiển thị từ trang 1 đến 5 hoặc đến totalPages nếu ít hơn
          }
          // Xử lý khi currentPage nằm ở cuối dải
          else if (currentPage > totalPages - 3) {
            page = totalPages - 4 + index; // Hiển thị 5 trang cuối
          }
          // Xử lý khi currentPage nằm ở giữa dải
          else {
            page = currentPage - 2 + index; // Hiển thị quanh currentPage
          }

          // Bỏ qua các trang không hợp lệ (nhỏ hơn 1 hoặc lớn hơn totalPages)
          if (page < 1 || page > totalPages) return null;

          return (
            <button
              key={page}
              onClick={(e) => handlePageChange(page)}
              className={currentPage === page ? "active" : ""}
            >
              {page}
            </button>
          );
        })}

        {/* Next Page Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {">"}
        </button>

        {/* Last Page Button */}
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          {">>"}
        </button>
      </div>

    </div>
  );
};



export default UserManagement;