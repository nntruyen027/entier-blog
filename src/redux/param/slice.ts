import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  param: null,
  error: null,
  params: [],
  rowCount: 0,
  pageCount: 1
};

const ParamSlice = createSlice({
  name: 'param',
  initialState: initialState,
  reducers: {
    getParamsStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    getParamsSuccess: (state, action) => {
      state.loading = false;
      state.params = action.payload.content;
      state.rowCount = action.payload?.totalElements || 1;
      state.pageCount = action.payload?.totalPages || 1;
    },
    getParamsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    createParamStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    createParamSuccess: (state, action) => {
      state.params.push(action.payload);
      state.rowCount = state.rowCount + 1;
      state.loading = false;
    },
    createParamFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateParamStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    updateParamSuccess: (state, action) => {
      const index = state.params.findIndex((param) => param._id === action.payload._id);
      if (index !== -1) {
        state.params[index] = action.payload; // Cập nhật param tại vị trí tìm thấy
      }
      state.loading = false;
    },
    updateParamFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteParamStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    deleteParamSuccess: (state, action) => {
      state.params = state.params.filter((param) => {
        return param._id != action.payload;
      }); // Xóa param dựa vào id
      state.loading = false;
      state.rowCount = state.rowCount - 1;
    },
    deleteParamFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const {
  createParamStart,
  createParamSuccess,
  createParamFailure,
  deleteParamStart,
  deleteParamSuccess,
  deleteParamFailure,
  updateParamFailure,
  updateParamStart,
  updateParamSuccess,
  getParamsSuccess,
  getParamsStart,
  getParamsFailure
} = ParamSlice.actions;

export default ParamSlice.reducer;
