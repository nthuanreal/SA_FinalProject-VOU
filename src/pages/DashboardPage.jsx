import React, { useState } from 'react';
import UserManager from '../components/UserManager';
import GameManager from '../components/GameManager';
import Report from '../components/Report';
import Logout from '../components/logoutBtn';
import ProfilePage from './ProfilePage';

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  return (
    <div className="dashboard-container">
      <nav className="sidebar">
        <h2>ADMIN DASHBOARD</h2>
        <button onClick={() => setActiveTab('profile')} className={activeTab === 'profile' ? 'active' : ''}>Profile</button>
        <button onClick={() => setActiveTab('usermanager')} className={activeTab === 'usermanager' ? 'active' : ''}>User Management</button> 
        <button onClick={() => setActiveTab('gamemanager')} className={activeTab === 'gamemanager' ? 'active' : ''}>Game Management</button> 
        <button onClick={() => setActiveTab('report')} className={activeTab === 'report' ? 'active' : ''}>Report</button>
        <Logout/>
      </nav>
      <main className="content">
        {activeTab === 'report' && <Report />}
        {activeTab === 'usermanager' && <UserManager/>}
        {activeTab === 'gamemanager' && <GameManager/>}
        {activeTab === 'profile' && <ProfilePage/>}
      </main>
    </div>
  );
};

export default DashboardPage;



