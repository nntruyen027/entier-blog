import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  productVersion: null,
  error: null,
  success: null,
  meta: null,
  productVersions: [],
  rowCount: 0,
  pageCount: 1
};

const productVersionSlice = createSlice({
  initialState,
  name: 'productVersion',
  reducers: {
    getProductVersionsStart: (state, action) => {
      state.loading = true;
      state.success = null;
      state.productVersions = [];
      state.error = null;
    },
    getProductVersionsSuccess: (state, action) => {
      state.productVersions = action.payload.content;
      state.rowCount = action.payload?.totalElements || 1;
      state.pageCount = action.payload?.totalPages || 1;
      state.loading = false;
    },
    getProductVersionsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    getProductVersionStart: (state, action) => {
      state.loading = true;
      state.success = null;
      state.productVersion = null;
      state.error = null;
    },
    getProductVersionSuccess: (state, action) => {
      state.productVersion = action.payload;
      state.loading = false;
    },
    getProductVersionFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    createProductVersionStart: (state, action) => {
      state.loading = true;
      state.success = null;
      state.productVersion = null;
      state.error = null;
    },
    createProductVersionSuccess: (state, action) => {
      state.productVersions.push(action.payload);
      state.loading = false;
      state.success = true;
    },
    createProductVersionFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateProductVersionStart: (state, action) => {
      state.loading = true;
      state.success = null;
      state.productVersion = null;
      state.error = null;
    },
    updateProductVersionSuccess: (state, action) => {
      const index = state.productVersions.findIndex((productVersion) => productVersion.id === action.payload.id);
      if (index !== -1) {
        state.productVersions[index] = action.payload;
      }
      state.loading = false;
      state.success = true;
    },
    updateProductVersionFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteProductVersionStart: (state, action) => {
      state.loading = true;
      state.success = null;
      state.productVersion = null;
      state.error = null;
    },
    deleteProductVersionSuccess: (state, action) => {
      state.productVersions = state.productVersions.filter((productVersion) => productVersion.id != action.payload.id);
      state.loading = false;
      state.success = true;
    },
    deleteProductVersionFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const {
  getProductVersionsStart,
  getProductVersionsSuccess,
  getProductVersionsFailure,
  createProductVersionSuccess,
  createProductVersionFailure,
  deleteProductVersionFailure,
  deleteProductVersionStart,
  deleteProductVersionSuccess,
  createProductVersionStart,
  getProductVersionFailure,
  getProductVersionSuccess,
  updateProductVersionFailure,
  updateProductVersionStart,
  updateProductVersionSuccess,
  getProductVersionStart
} = productVersionSlice.actions;

export default productVersionSlice.reducer;
