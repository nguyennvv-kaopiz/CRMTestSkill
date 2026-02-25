import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const api = axios.create({ baseURL });

export function getLeads(params) {
  return api.get('/leads', { params }).then((res) => res.data);
}

export function getLeadById(id) {
  return api.get(`/leads/${id}`).then((res) => res.data);
}

export function createLead(data) {
  return api.post('/leads', data).then((res) => res.data);
}

export function updateLead(id, data) {
  return api.put(`/leads/${id}`, data).then((res) => res.data);
}

export function convertLeadToCustomer(id) {
  return api.post(`/leads/${id}/convert`).then((res) => res.data);
}
