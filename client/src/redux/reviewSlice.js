import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { reviewService } from '../services/reviewService.js';

export const fetchReviews = createAsyncThunk('reviews/list', async (restaurantId, { rejectWithValue }) => {
  try {
    return await reviewService.listByRestaurant(restaurantId);
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Could not load reviews');
  }
});

export const createReview = createAsyncThunk('reviews/create', async (payload, { rejectWithValue }) => {
  try {
    return await reviewService.create(payload);
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Could not create review');
  }
});

const reviewSlice = createSlice({
  name: 'reviews',
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher((action) => action.type.startsWith('reviews/') && action.type.endsWith('/pending'), (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher((action) => action.type === fetchReviews.fulfilled.type, (state, action) => {
        state.loading = false;
        state.items = action.payload.reviews || [];
      })
      .addMatcher((action) => action.type === createReview.fulfilled.type, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload.review);
      })
      .addMatcher((action) => action.type.startsWith('reviews/') && action.type.endsWith('/rejected'), (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default reviewSlice.reducer;
