import React,{ useEffect, useState } from 'react';
import API from "../services/api";
const Report = () => {
    const [userCount, setUserCount] = useState(0);
    const [activeUserCount, setActiveUserCount] = useState(0);
    const [roleUserCount, setRoleUserCount] = useState(0);
    const [rolePartnerCount, setRolePartnerCount] = useState(0);
    const [uniquePartnerCount, setUniquePartnerCount] = useState(0);
  
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const { data } = await API.get("/user/list");
  
          // Tổng số người dùng
          const totalUsers = data.length;
          setUserCount(totalUsers);
          
          // tổng user active
          const activeUsers = data.filter(user => user.isActive).length;
          setActiveUserCount(activeUsers);
          
          //tổng user
          const usersWithRoleUser = data.filter(user => user.role === "user").length;
          setRoleUserCount(usersWithRoleUser);
  
          // tổng partner user
          const usersWithRolePartner = data.filter(user => user.role === "partner").length;
          setRolePartnerCount(usersWithRolePartner);
          

          //tổng partner
          const uniquePartnerIds = new Set(data.map(user => user.partner_id).filter(id => id != null && id!=0));
          setUniquePartnerCount(uniquePartnerIds.size);
  
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };
      fetchUsers();
    }, []);
  

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
        <div className="card">
            <h3>Active Users</h3>
            <h4>{activeUserCount}</h4>
          </div>
          <div className="card">
            <h3>Users</h3>
            <h4>{roleUserCount}</h4>
          </div>
          <div className="card">
            <h3>Partner Users</h3>
            <h4>{rolePartnerCount}</h4>
          </div>
          <div className="card">
            <h3>Partners</h3>
            <h4>{uniquePartnerCount}</h4>
          </div>
        </div>
    </>

  );
};

export default Report;