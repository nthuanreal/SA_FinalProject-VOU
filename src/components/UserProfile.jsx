import React from "react";
import {getInfoFromToken} from "../services/auth";


const UserProfile = () => {
    const data = getInfoFromToken();
  return (
    <div>
      <h1>User Profile</h1>
      <p>Welcome! {data.username}</p>
    </div>
  );
};

export default UserProfile;

