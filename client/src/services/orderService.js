import { api } from './authService.js';

export const orderService = {
  create: (payload) => api.post('/orders', payload).then((res) => res.data),
  list: () => api.get('/orders').then((res) => res.data),
  get: (id) => api.get(`/orders/${id}`).then((res) => res.data),
  updateStatus: (id, status) => api.patch(`/orders/${id}/status`, { status }).then((res) => res.data),
  assigned: () => api.get('/orders/delivery/assigned').then((res) => res.data)
};
