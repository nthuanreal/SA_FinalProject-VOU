import React,{ useEffect, useState } from 'react';
import API from "../services/api";
const Report = () => {
  const [userCount, setUserCount] = useState(0); // State để lưu số lượng user

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await API.get("/user/list");
        const totalUsers = data.length;
        setUserCount(totalUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  return (

    <>
      <h1 className='dashboard-title'> Reports</h1>
      <div className="cards">
        <div className="card">
          <h3>Total Users</h3>
          <h4>{userCount}</h4>
        </div>
      </div>
    </>

  );
};

export default Report;