import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { authService } from '../services/authService.js';

const initialState = {
  user: JSON.parse(localStorage.getItem('qb_user') || 'null'),
  token: localStorage.getItem('qb_token'),
  loading: false,
  error: null
};

export const loginUser = createAsyncThunk('auth/login', async (payload, { rejectWithValue }) => {
  try {
    return await authService.login(payload);
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Login failed');
  }
});

export const registerUser = createAsyncThunk('auth/register', async (payload, { rejectWithValue }) => {
  try {
    return await authService.register(payload);
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Registration failed');
  }
});

export const updateProfile = createAsyncThunk('auth/updateProfile', async (payload, { rejectWithValue }) => {
  try {
    return await authService.updateProfile(payload);
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Profile update failed');
  }
});

const persistSession = ({ user, token }) => {
  localStorage.setItem('qb_user', JSON.stringify(user));
  localStorage.setItem('qb_token', token);
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    hydrateAuth: (state) => {
      state.user = JSON.parse(localStorage.getItem('qb_user') || 'null');
      state.token = localStorage.getItem('qb_token');
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('qb_user');
      localStorage.removeItem('qb_token');
      toast.success('Signed out');
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher((action) => action.type.startsWith('auth/') && action.type.endsWith('/pending'), (state) => {
        state.loading = true;
        state.error = null;
      })
      // login & register — return both user + token
      .addMatcher((action) => [loginUser.fulfilled.type, registerUser.fulfilled.type].includes(action.type), (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        persistSession(action.payload);
        // sync localStorage with updated user after login/register
        localStorage.setItem('qb_user', JSON.stringify(action.payload.user));
        localStorage.setItem('qb_token', action.payload.token);
      })
      // updateProfile — only returns user (no token)
      .addMatcher((action) => action.type === updateProfile.fulfilled.type, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        localStorage.setItem('qb_user', JSON.stringify(action.payload.user));
      })
      .addMatcher((action) => action.type.startsWith('auth/') && action.type.endsWith('/rejected'), (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { hydrateAuth, logout } = authSlice.actions;
export default authSlice.reducer;
