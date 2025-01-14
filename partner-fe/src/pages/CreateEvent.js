import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent, fetchGames } from '../api/api';

const CreateEvent = () => {
  const [eventData, setEventData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    voucherQuantity: '',
    game: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [games, setGames] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getGames = async () => {
      try {
        const gamesData = await fetchGames();
        setGames(gamesData);
      } catch (error) {
        console.error('Failed to fetch games:', error);
      }
    };
    getGames();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const validateFields = () => {
    const newErrors = {};

    if (!eventData.name.trim()) {
      newErrors.name = 'Tên sự kiện là bắt buộc.';
    }

    if (!eventData.startDate) {
      newErrors.startDate = 'Ngày bắt đầu là bắt buộc.';
    }

    if (!eventData.endDate) {
      newErrors.endDate = 'Ngày kết thúc là bắt buộc.';
    }

    if (!eventData.voucherQuantity) {
      newErrors.voucherQuantity = 'Số lượng voucher là bắt buộc.';
    } else if (isNaN(eventData.voucherQuantity) || eventData.voucherQuantity <= 0) {
      newErrors.voucherQuantity = 'Số lượng voucher phải là một số lớn hơn 0.';
    }

    if (!eventData.game) {
      newErrors.game = 'Chọn trò chơi là bắt buộc.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      await createEvent(eventData);
      navigate('/events');
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || 'Đã xảy ra lỗi khi tạo sự kiện.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 min-h-screen">
      <h1 className="text-3xl font-semibold text-center mb-8">Tạo Sự Kiện</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-white p-6 shadow-md rounded-md"
      >
        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}

        {/* Form Fields */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Tên Sự Kiện</label>
          <input
            type="text"
            name="name"
            value={eventData.name}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Nhập tên sự kiện"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Ngày Bắt Đầu</label>
          <input
            type="date"
            name="startDate"
            value={eventData.startDate}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md ${
              errors.startDate ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Ngày Kết Thúc</label>
          <input
            type="date"
            name="endDate"
            value={eventData.endDate}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md ${
              errors.endDate ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Số lượng Voucher</label>
          <input
            type="number"
            name="voucherQuantity"
            value={eventData.voucherQuantity}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md ${
              errors.voucherQuantity ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Nhập số lượng voucher"
            min="1"
          />
          {errors.voucherQuantity && (
            <p className="text-red-500 text-sm mt-1">{errors.voucherQuantity}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Chọn Trò Chơi</label>
          <select
            name="game"
            value={eventData.game}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md ${
              errors.game ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Chọn trò chơi</option>
            {games.length > 0 ? (
              games.map((game) => (
                <option key={game.id} value={game.id}>
                  {game.name}
                </option>
              ))
            ) : (
              <option value="">Không có trò chơi nào</option>
            )}
          </select>
          {errors.game && <p className="text-red-500 text-sm mt-1">{errors.game}</p>}
        </div>

        <button
          type="submit"
          className={`px-4 py-2 text-white rounded-md ${
            loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
          }`}
          disabled={loading}
        >
          {loading ? 'Đang lưu...' : 'Lưu'}
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
