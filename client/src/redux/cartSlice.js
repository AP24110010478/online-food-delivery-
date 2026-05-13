import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const initialState = {
  items: JSON.parse(localStorage.getItem('qb_cart') || '[]'),
  restaurant: JSON.parse(localStorage.getItem('qb_cart_restaurant') || 'null')
};

const persist = (state) => {
  localStorage.setItem('qb_cart', JSON.stringify(state.items));
  localStorage.setItem('qb_cart_restaurant', JSON.stringify(state.restaurant));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { item, restaurant } = action.payload;
      if (state.restaurant && state.restaurant._id !== restaurant._id) {
        state.items = [];
        toast('Cart reset for a new restaurant');
      }
      state.restaurant = restaurant;
      const existing = state.items.find((entry) => entry._id === item._id);
      if (existing) existing.quantity += 1;
      else state.items.push({ ...item, quantity: 1 });
      persist(state);
      toast.success('Added to cart');
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      if (quantity < 1) {
        state.items = state.items.filter((item) => item._id !== id);
        if (!state.items.length) state.restaurant = null;
      } else {
        state.items = state.items.map((item) => (item._id === id ? { ...item, quantity } : item));
      }
      persist(state);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
      if (!state.items.length) state.restaurant = null;
      persist(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.restaurant = null;
      persist(state);
    }
  }
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
