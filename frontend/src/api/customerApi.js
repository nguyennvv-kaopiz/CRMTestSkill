import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const api = axios.create({ baseURL });

export function getCustomers() {
  return api.get('/customers').then((res) => res.data);
}

export function getCustomerById(id) {
  return api.get(`/customers/${id}`).then((res) => res.data);
}

export function createCustomer(data) {
  return api.post('/customers', data).then((res) => res.data);
}

export function updateCustomer(id, data) {
  return api.patch(`/customers/${id}`, data).then((res) => res.data);
}

export function deleteCustomer(id) {
  return api.delete(`/customers/${id}`);
}

export function getCustomerTags(id) {
  return api.get(`/customers/${id}/tags`).then((res) => res.data);
}

export function getInteractionHistory(id) {
  return api.get(`/customers/${id}/history`).then((res) => res.data);
}
