import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { orderService } from '../services/orderService.js';

export const fetchOrders = createAsyncThunk('orders/list', async (_, { rejectWithValue }) => {
  try {
    return await orderService.list();
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Could not load orders');
  }
});

export const createOrder = createAsyncThunk('orders/create', async (payload, { rejectWithValue }) => {
  try {
    return await orderService.create(payload);
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Could not create order');
  }
});

export const updateOrderStatus = createAsyncThunk('orders/status', async ({ id, status }, { rejectWithValue }) => {
  try {
    return await orderService.updateStatus(id, status);
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Could not update order');
  }
});

const orderSlice = createSlice({
  name: 'orders',
  initialState: { items: [], selected: null, loading: false, error: null },
  reducers: { setSelectedOrder: (state, action) => { state.selected = action.payload; } },
  extraReducers: (builder) => {
    builder
      .addMatcher((action) => action.type.startsWith('orders/') && action.type.endsWith('/pending'), (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher((action) => action.type === fetchOrders.fulfilled.type, (state, action) => {
        state.loading = false;
        state.items = action.payload.orders || [];
      })
      .addMatcher((action) => action.type === createOrder.fulfilled.type, (state, action) => {
        state.loading = false;
        state.selected = action.payload.order;
        state.items.unshift(action.payload.order);
      })
      .addMatcher((action) => action.type === updateOrderStatus.fulfilled.type, (state, action) => {
        state.loading = false;
        state.items = state.items.map((order) => (order._id === action.payload.order._id ? action.payload.order : order));
      })
      .addMatcher((action) => action.type.startsWith('orders/') && action.type.endsWith('/rejected'), (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setSelectedOrder } = orderSlice.actions;
export default orderSlice.reducer;
