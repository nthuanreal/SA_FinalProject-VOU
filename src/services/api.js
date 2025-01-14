import axios from "axios";

const createService = (baseURL) => {
  const API = axios.create({ baseURL });

  API.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("jwt"); 
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return API;
};

const APIserviceFactory = {
  userService: createService("https://user.tuan-anh-sd.software/"), // User service base URL
  gameService: createService("https://game.tuan-anh-sd.software/"), // Game service base URL
};

export default APIserviceFactory;

