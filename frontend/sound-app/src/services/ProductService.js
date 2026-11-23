import axios from 'axios';
import { STORAGE_KEYS } from '../components/store';

const API_URL = 'http://localhost:8080/api/v1/productos';

function authorizedHeaders() {
  const token = window.localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const ProductService = {
  // LISTAR
  getProducts: async () => {
    const response = await axios.get(`${API_URL}/listar`);
    return response.data || [];
  },

  getProductsByName: async (nombre) => {
    const response = await axios.get(`${API_URL}/listar/nombre/${encodeURIComponent(nombre)}`);
    return response.data || [];
  },

  getProductsByCategory: async (categoria) => {
    const response = await axios.get(`${API_URL}/listar/categoria/${encodeURIComponent(categoria)}`);
    return response.data || [];
  },

  // BUSCAR
  getProductById: async (id) => {
    const response = await axios.get(`${API_URL}/buscar/id/${id}`);
    return response.data;
  },

  getProductByCode: async (codigo) => {
    const response = await axios.get(`${API_URL}/buscar/codigo/${encodeURIComponent(codigo)}`);
    return response.data;
  },

  getProductByName: async (nombre) => {
    const response = await axios.get(`${API_URL}/buscar/nombre/${encodeURIComponent(nombre)}`);
    return response.data;
  },

  // GUARDAR
  createProduct: async (product) => {
    const productPayload = { ...product };
    // The database generates this ID; the client value is only temporary.
    delete productPayload.id;
    const response = await axios.post(`${API_URL}/guardar`, productPayload, { headers: authorizedHeaders() });
    return response.data;
  },

  // ACTUALIZAR
  updateProduct: async (codigo, product) => {
    const response = await axios.put(`${API_URL}/actualizar/codigo/${encodeURIComponent(codigo)}`, product, { headers: authorizedHeaders() });
    return response.data;
  },

  // ELIMINAR
  deleteProduct: async (id) => {
    const response = await axios.delete(`${API_URL}/eliminar/id/${id}`, { headers: authorizedHeaders() });
    return response.data;
  },

  deleteProductByCode: async (codigo) => {
    const response = await axios.delete(`${API_URL}/eliminar/codigo/${encodeURIComponent(codigo)}`, { headers: authorizedHeaders() });
    return response.data;
  }
};