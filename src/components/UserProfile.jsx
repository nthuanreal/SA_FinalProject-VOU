import React from "react";
import { getInfoFromToken } from "../services/auth";
import Logout from "./logoutBtn";


const UserProfile = () => {
  const data = getInfoFromToken();
  return (

<aside className="profile-card">
  <header>
      <img src="/user-avatar.png  "/>
    <h1>{data.username}</h1>
    <h2>{data.role}</h2> 
  </header>
  <div className="profile-bio">
    <p> Email: {data.email}</p>
    <Logout/>
  </div>

</aside>

  );
};

export default UserProfile;

