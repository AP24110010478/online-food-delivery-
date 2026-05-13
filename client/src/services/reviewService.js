import { api } from './authService.js';

export const reviewService = {
  listByRestaurant: (restaurantId) => api.get(`/reviews/restaurant/${restaurantId}`).then((res) => res.data),
  create: (payload) => api.post('/reviews', payload).then((res) => res.data),
  remove: (id) => api.delete(`/reviews/${id}`).then((res) => res.data)
};
