import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/auth';

export const AuthService = {
  login: async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  },

  register: async ({ nombre, email, password }) => {
    const response = await axios.post(`${API_URL}/registro`, { nombre, email, password });
    return response.data;
  }
};
