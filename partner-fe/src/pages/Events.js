import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import EventCard from '../components/EventCard';
import { fetchEvents } from '../api/api';
import { useEventContext } from '../contexts/EventContext';

const Events = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { events, setEvents } = useEventContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);

  const getEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchEvents();
      const fetchedEvents = data?.data?.events;
      if (fetchedEvents) {
        setEvents(fetchedEvents);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEvents();
  }, [location.pathname]);

  useEffect(() => {
    let filtered = events;

    if (searchQuery) {
      filtered = filtered.filter((event) =>
        event.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (startDate) {
      filtered = filtered.filter((event) => {
        const fromDate = new Date(event.from_date * 1000);
        return fromDate >= new Date(startDate);
      });
    }

    if (endDate) {
      filtered = filtered.filter((event) => {
        const toDate = new Date(event.from_date * 1000);
        return toDate <= new Date(endDate);
      });
    }

    setFilteredEvents(filtered);
  }, [searchQuery, startDate, endDate, events]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-6 min-h-screen">
      <h1 className="text-3xl font-semibold text-center mb-8">Danh sách sự kiện</h1>

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Tìm kiếm sự kiện..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border rounded-md w-full sm:w-auto"
          />

          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-4 py-2 border rounded-md"
          />

          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-4 py-2 border rounded-md"
          />
        </div>

        <button
          onClick={() => navigate('/create-event')}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Tạo Sự Kiện
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))
        ) : (
          <p className="text-lg text-gray-700">Không có sự kiện nào phù hợp.</p>
        )}
      </div>
    </div>
  );
};

export default Events;
