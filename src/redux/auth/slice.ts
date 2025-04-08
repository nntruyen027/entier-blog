import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginForm } from '~/types';

const initialState = {
  isLogin: false,
  token: localStorage.getItem('token'),
  account: null,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state, action: PayloadAction<LoginForm>) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.isLogin = true;
      state.account = action.payload;
    },
    loginFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isLogin = false;
      state.token = null;
      state.account = null;
    },
    getSelfStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getSelfSuccess: (state, action) => {
      state.loading = false;
      state.account = action.payload;
      state.isLogin = true;
    },
    getSelfFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isLogin = false;
      state.account = null;
    },
    logout: (state) => {
      state.loading = true;
      state.account = null;
      state.isLogin = false;
      state.token = null;
      localStorage.removeItem('token');
    },
    updatePassSelfStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    updatePassSelfSuccess: (state) => {
      state.loading = false;
    },
    updatePassSelfFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateSelfStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    updateSelfSuccess: (state, action) => {
      state.loading = false;
      state.account = action.payload;
    },
    updateSelfFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const {
  getSelfSuccess,
  getSelfFail,
  loginSuccess,
  loginFail,
  loginStart,
  getSelfStart,
  logout,
  updatePassSelfStart,
  updatePassSelfSuccess,
  updatePassSelfFail,
  updateSelfStart,
  updateSelfSuccess,
  updateSelfFailure
} = authSlice.actions;
export default authSlice.reducer;
