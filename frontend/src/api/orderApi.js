import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const api = axios.create({ baseURL });

export function getOrders() {
  return api.get('/orders').then((res) => res.data);
}

export function getOrderById(id) {
  return api.get(`/orders/${id}`).then((res) => res.data);
}
