import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col p-4 shadow-lg h-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Admin Panel</h2>
      <ul className="flex flex-col space-y-4">
        <li>
          <Link 
            to="/events" 
            className="block py-2 px-4 rounded-lg hover:bg-gray-700 transition-all duration-200"
          >
            Events
          </Link>
        </li>
      </ul>
      <div className="mt-auto text-center text-sm text-gray-400">
        © 2025 Admin Panel
      </div>
    </div>
  );
};

export default Sidebar;
