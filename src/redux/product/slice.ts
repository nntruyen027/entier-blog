import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  product: null,
  error: null,
  success: null,
  meta: null,
  products: [],
  rowCount: 0,
  pageCount: 1
};

const productSlice = createSlice({
  initialState,
  name: 'product',
  reducers: {
    getProductsStart: (state, action) => {
      state.loading = true;
      state.success = null;
      state.products = [];
      state.error = null;
    },
    getProductsSuccess: (state, action) => {
      state.products = action.payload.content;
      state.rowCount = action.payload?.totalElements || 1;
      state.pageCount = action.payload?.totalPages || 1;
      state.loading = false;
    },
    getProductsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    getProductStart: (state, action) => {
      state.loading = true;
      state.success = null;
      state.product = null;
      state.error = null;
    },
    getProductSuccess: (state, action) => {
      state.product = action.payload;
      state.loading = false;
    },
    getProductFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    createProductStart: (state, action) => {
      state.loading = true;
      state.success = null;
      state.product = null;
      state.error = null;
    },
    createProductSuccess: (state, action) => {
      state.products.push(action.payload);
      state.loading = false;
      state.success = true;
    },
    createProductFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateProductStart: (state, action) => {
      state.loading = true;
      state.success = null;
      state.product = null;
      state.error = null;
    },
    updateProductTagStart: (state, action) => {
      state.loading = true;
      state.success = null;
      state.product = null;
      state.error = null;
    },
    updateProductSuccess: (state, action) => {
      const index = state.products.findIndex((product) => product.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
      state.loading = false;
      state.success = true;
    },
    updateProductFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteProductStart: (state, action) => {
      state.loading = true;
      state.success = null;
      state.product = null;
      state.error = null;
    },
    deleteProductSuccess: (state, action) => {
      state.products = state.products.filter((product) => product.id != action.payload);
      state.loading = false;
      state.success = true;
    },
    deleteProductFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const {
  getProductsStart,
  getProductsSuccess,
  getProductsFailure,
  createProductSuccess,
  createProductFailure,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  createProductStart,
  getProductFailure,
  getProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  getProductStart,
  updateProductTagStart
} = productSlice.actions;

export default productSlice.reducer;
