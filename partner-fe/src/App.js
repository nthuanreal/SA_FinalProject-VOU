import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import { EventProvider } from './contexts/EventContext';
import CreateEvent from './pages/CreateEvent';
import Login from './pages/Login';
import { setLogoutCallback } from './api/api';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setLogoutCallback(() => {
      setIsAuthenticated(false);
    });

    const checkAuth = () => {
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token);
      setIsLoading(false);
    };
    
    checkAuth();
  }, []); 

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token);
      setIsLoading(false);
    };
    
    checkAuth();
  }, []); 

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <EventProvider>
      <Router>
        <div className="flex">
          {isAuthenticated && <Sidebar />}
          <div className="flex-1 bg-gray-100 p-6">
            <Routes>
              <Route 
                path="/login" 
                element={
                  isAuthenticated ? <Navigate to="/events" replace /> : <Login setIsAuthenticated={setIsAuthenticated} />
                } 
              />
              <Route 
                path="/" 
                element={
                  isAuthenticated ? <Navigate to="/events" replace /> : <Navigate to="/login" replace />
                } 
              />
              <Route 
                path="/events" 
                element={
                  isAuthenticated ? <Events /> : <Navigate to="/login" replace />
                } 
              />
              <Route 
                path="/event/:id" 
                element={
                  isAuthenticated ? <EventDetail /> : <Navigate to="/login" replace />
                } 
              />
              <Route 
                path="/create-event" 
                element={
                  isAuthenticated ? <CreateEvent /> : <Navigate to="/login" replace />
                } 
              />
            </Routes>
          </div>
        </div>
      </Router>
    </EventProvider>
  );
}

export default App;