import { api } from './authService.js';

export const restaurantService = {
  list: (params = {}) => api.get('/restaurants', { params }).then((res) => res.data),
  get: (id) => api.get(`/restaurants/${id}`).then((res) => res.data),
  create: (payload) => api.post('/restaurants', payload).then((res) => res.data),
  update: (id, payload) => api.put(`/restaurants/${id}`, payload).then((res) => res.data),
  remove: (id) => api.delete(`/restaurants/${id}`).then((res) => res.data),
  addMenuItem: (restaurantId, payload) => api.post(`/menus/${restaurantId}`, payload).then((res) => res.data),
  updateMenuItem: (id, payload) => api.put(`/menus/item/${id}`, payload).then((res) => res.data),
  removeMenuItem: (id) => api.delete(`/menus/item/${id}`).then((res) => res.data)
};
