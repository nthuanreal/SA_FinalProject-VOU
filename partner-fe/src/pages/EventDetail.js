import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEventContext } from '../contexts/EventContext';
import { updateEvent } from '../api/api';

const EventDetail = () => {
  const { id } = useParams();
  const { events } = useEventContext();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    from_date: '',
    to_date: '',
    vouchers_quantity: '',
  });

  useEffect(() => {
    const foundEvent = events.find((event) => event.id == id);
    if (foundEvent) {
      setEvent(foundEvent);
      setFormData({
        name: foundEvent.name,
        from_date: formatDateForInput(foundEvent.from_date),
        to_date: formatDateForInput(foundEvent.to_date),
        vouchers_quantity: foundEvent.vouchers_quantity,
      });
      setError(null);
    } else {
      setEvent(null);
      setError('Event not found');
    }
    setLoading(false);
  }, [id, events]);

  const formatDateForInput = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp * 1000);
    return date.toISOString().split('T')[0];
  };

  const formatDateForDisplay = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-GB');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedEvent = {
        ...event,
        name: formData.name,
        from_date: Math.floor(new Date(formData.from_date).getTime() / 1000),
        to_date: Math.floor(new Date(formData.to_date).getTime() / 1000),
        vouchers_quantity: parseInt(formData.vouchers_quantity),
      };
      await updateEvent(updatedEvent);
      setIsEditing(false);
      setEvent(updatedEvent);
    } catch (err) {
      setError('Failed to update event');
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen flex flex-col container mx-auto px-4 py-6">
      <div className="border p-6 rounded-lg shadow-md bg-white max-w-4xl mx-auto">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <img
              src={event.image || 'https://images.dog.ceo/breeds/segugio-italian/n02090722_002.jpg'}
              alt={event.name}
              className="w-full h-auto object-cover rounded-md mb-6"
            />

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="date"
                  name="from_date"
                  value={formData.from_date}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">End Date</label>
                <input
                  type="date"
                  name="to_date"
                  value={formData.to_date}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Vouchers Quantity</label>
                <input
                  type="number"
                  name="vouchers_quantity"
                  value={formData.vouchers_quantity}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        ) : (
          <>
            <img
              src={event.image || 'https://images.dog.ceo/breeds/segugio-italian/n02090722_002.jpg'}
              alt={event.name}
              className="w-full h-auto object-cover rounded-md"
            />

            <div className="mt-6 space-y-4">
              <h2 className="text-3xl font-semibold text-gray-800">{event.name}</h2>
              <div className="flex flex-col space-y-2">
                <div className="flex justify-between text-lg text-gray-700">
                  <span><strong>Ngày bắt đầu:</strong></span>
                  <span>{formatDateForDisplay(event.from_date)}</span>
                </div>
                <div className="flex justify-between text-lg text-gray-700">
                  <span><strong>Ngày kết thúc:</strong></span>
                  <span>{formatDateForDisplay(event.to_date)}</span>
                </div>
                <div className="flex justify-between text-lg text-gray-700">
                  <span><strong>Tên trò chơi:</strong></span>
                  <span>{event.game_name}</span>
                </div>
                <div className="flex justify-between text-lg text-gray-700">
                  <span><strong>Số lượng vouchers:</strong></span>
                  <span>{event.vouchers_quantity}</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EventDetail;
