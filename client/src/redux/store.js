import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice.js';
import cartReducer from './cartSlice.js';
import restaurantReducer from './restaurantSlice.js';
import orderReducer from './orderSlice.js';
import reviewReducer from './reviewSlice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    restaurants: restaurantReducer,
    orders: orderReducer,
    reviews: reviewReducer
  }
});
