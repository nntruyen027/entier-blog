import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  personal: null,
  error: null
};

const personalSlice = createSlice({
  name: 'personal',
  initialState,
  reducers: {
    getStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getSuccess: (state, action) => {
      state.loading = false;
      state.personal = action.payload;
    },
    getFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    createSuccess: (state, action) => {
      state.loading = false;
      state.personal = action.payload;
    },
    createFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    updateSuccess: (state, action) => {
      state.loading = false;
      state.personal = action.payload;
    },
    updateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateAvatarStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    updateAvatarSuccess: (state, action) => {
      state.loading = false;
      state.personal = action.payload;
    },
    updateAvatarFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const {
  getStart,
  createStart,
  createFailure,
  getFailure,
  updateFailure,
  updateStart,
  updateSuccess,
  getSuccess,
  createSuccess,
  updateAvatarFailure,
  updateAvatarStart,
  updateAvatarSuccess
} = personalSlice.actions;

export default personalSlice.reducer;
