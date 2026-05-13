import { api } from './authService.js';

export const paymentService = {
  createIntent: (payload) => api.post('/payments/create-intent', payload).then((res) => res.data),
  verify: (payload) => api.post('/payments/verify', payload).then((res) => res.data)
};
