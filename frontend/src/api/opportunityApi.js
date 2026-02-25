import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const api = axios.create({ baseURL });

export function getOpportunities(params) {
  return api.get('/opportunities', { params }).then((res) => res.data);
}

export function getPipeline() {
  return api.get('/opportunities/pipeline').then((res) => res.data);
}

export function getOpportunityById(id) {
  return api.get(`/opportunities/${id}`).then((res) => res.data);
}

export function createOpportunity(data) {
  return api.post('/opportunities', data).then((res) => res.data);
}

export function updateOpportunity(id, data) {
  return api.put(`/opportunities/${id}`, data).then((res) => res.data);
}

export function moveOpportunityStage(id, stage_id) {
  return api.patch(`/opportunities/${id}/stage`, { stage_id }).then((res) => res.data);
}
