import axios from 'axios';
import { STORAGE_KEYS } from '../components/store';

const API_URL = 'http://localhost:8080/api/v1/usuarios';

function authorizedHeaders() {
  const token = window.localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const UserService = {
  getUsers: async () => {
    const response = await axios.get(API_URL, { headers: authorizedHeaders() });
    return response.data || [];
  },

  createUser: async (user) => {
    const response = await axios.post(API_URL, user, { headers: authorizedHeaders() });
    return response.data;
  },

  updateUser: async (id, user) => {
    const response = await axios.put(`${API_URL}/${id}`, user, { headers: authorizedHeaders() });
    return response.data;
  },

  deleteUser: async (id) => {
    await axios.delete(`${API_URL}/${id}`, { headers: authorizedHeaders() });
  }
};
