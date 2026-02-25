import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const api = axios.create({ baseURL });

export function getPipelineStages() {
  return api.get('/pipeline-stages').then((res) => res.data);
}
