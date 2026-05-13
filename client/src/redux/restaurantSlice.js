import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { restaurantService } from '../services/restaurantService.js';

export const fetchRestaurants = createAsyncThunk('restaurants/list', async (params, { rejectWithValue }) => {
  try {
    return await restaurantService.list(params);
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Could not load restaurants');
  }
});

export const fetchRestaurant = createAsyncThunk('restaurants/get', async (id, { rejectWithValue }) => {
  try {
    return await restaurantService.get(id);
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Could not load restaurant');
  }
});

const restaurantSlice = createSlice({
  name: 'restaurants',
  initialState: { items: [], selected: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher((action) => action.type.startsWith('restaurants/') && action.type.endsWith('/pending'), (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher((action) => action.type === fetchRestaurants.fulfilled.type, (state, action) => {
        state.loading = false;
        state.items = action.payload.restaurants || [];
      })
      .addMatcher((action) => action.type === fetchRestaurant.fulfilled.type, (state, action) => {
        state.loading = false;
        state.selected = action.payload.restaurant;
      })
      .addMatcher((action) => action.type.startsWith('restaurants/') && action.type.endsWith('/rejected'), (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default restaurantSlice.reducer;
