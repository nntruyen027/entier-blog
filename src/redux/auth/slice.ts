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
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.token = action.payload;
      state.isLogin = true;
    },
    loginFail: (state, action: PayloadAction<string>) => {
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
    getSelfSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.account = action.payload;
      state.isLogin = true;
    },
    getSelfFail: (state, action: PayloadAction<string>) => {
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
    }
  }
});

export const { getSelfSuccess, getSelfFail, loginSuccess, loginFail, loginStart, getSelfStart, logout } =
  authSlice.actions;
export default authSlice.reducer;
