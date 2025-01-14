import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api/v1',
});

let logoutCallback = null;

export const setLogoutCallback = (callback) => {
  logoutCallback = callback;
};

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        if (logoutCallback) {
          logoutCallback();
        }
      }
    }
    return Promise.reject(error);
  }
);

export const fetchEvents = async () => {
  try {
    const response = await api.get('/events');
    if (response.data && response.data.data && response.data.data.events) {
      const events = response.data.data.events.map(event => {
        event.image = "https://image.dienthoaivui.com.vn/x,webp,q90/https://dashboard.dienthoaivui.com.vn/uploads/dashboard/editor_upload/sale-tet-dien-thoai-vui-2025.jpg"
        return event;
      });
      return { ...response.data, data: { ...response.data.data, events } };
    }
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to fetch events: ' + error.message);
  }
};

export const login = async ({ username, password }) => {
  try {
    const response = await api.post('/login', {
      username,
      password,
    });

    const token = response.data.token;
    if (token) {
      localStorage.setItem('token', token);
    }

    return response.data;
  } catch (error) {
    throw new Error('Failed to login: ' + error.message);
  }
};

export const createEvent = async (eventData) => {
  try {
    const startTimestamp = new Date(eventData.startDate).getTime() / 1000;
    const endTimestamp = new Date(eventData.endDate).getTime() / 1000;

    const response = await api.post('/events', {
      name: eventData.name,
      from_date: startTimestamp,
      to_date: endTimestamp,
      vouchers_quantity: parseInt(eventData.voucherQuantity, 10),
      game_id: eventData.game,
    });

    return response.data;
  } catch (error) {
    throw new Error('Failed to create event: ' + error.message);
  }
};

export const updateEvent = async (eventData) => {
  try {
    const response = await api.post(`/events`, {
      id: eventData.id,
      name: eventData.name,
      from_date: eventData.from_date,
      to_date: eventData.to_date,
      vouchers_quantity: parseInt(eventData.voucherQuantity, 10),
    });

    return response.data;
  } catch (error) {
    throw new Error('Failed to update event: ' + error.message);
  }
};

export const fetchGames = async () => {
  try {
    const response = await api.get('/games');
    console.log(response.data);
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to fetch events: ' + error.message);
  }
};