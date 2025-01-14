// EventCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  const fromDate = new Date(event.from_date * 1000);  // Convert Unix timestamp (seconds) to milliseconds
  const toDate = new Date(event.to_date * 1000);      // Convert Unix timestamp (seconds) to milliseconds

  return (
    <Link to={`/event/${event.id}`} className="block">
      <div className="border p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
        <img
          src={event.image}
          alt={event.name}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <h2 className="text-xl font-semibold mb-2">{event.name}</h2>
        <p className="text-gray-600">
          {fromDate.toLocaleDateString()} - {toDate.toLocaleDateString()}
        </p>
      </div>
    </Link>
  );
};

export default EventCard;
