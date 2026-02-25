import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const api = axios.create({ baseURL });

export function getDashboardStats() {
  return api.get('/dashboard/stats').then((res) => res.data);
}
