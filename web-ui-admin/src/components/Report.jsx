import React, { useEffect, useState } from 'react';

// import APIserviceFactory vào nơi cần làm việc
import APIserviceFactory from "../services/api";

const Report = () => {
  const [userCount, setUserCount] = useState(0);
  const [gameCount, setGameCount] = useState(0);
  const [activeUserCount, setActiveUserCount] = useState(0);
  const [roleUserCount, setRoleUserCount] = useState(0);
  const [rolePartnerCount, setRolePartnerCount] = useState(0);
  const [uniquePartnerCount, setUniquePartnerCount] = useState(0);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        
        //gọi instance của service
        const { data } = await APIserviceFactory.userService.get("/user/list");
        const games = await APIserviceFactory.gameService.get("/games");

        // Tổng số người dùng
        const totalUsers = data.length;
        setUserCount(totalUsers);

        //Tổng số games
        const totalGames = games.data.data.length;
        setGameCount(totalGames);

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
        const uniquePartnerIds = new Set(data.map(user => user.partner_id).filter(id => id != null && id != 0));
        setUniquePartnerCount(uniquePartnerIds.size);

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
          <h3>Current games</h3>
          <h4>{gameCount}</h4>
        </div>
        <div className="card">
          <h3>Partners</h3>
          <h4>{uniquePartnerCount}</h4>
        </div> 
      </div>
      
      <div className="cards">
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
      </div>

    </>

  );
};

export default Report;