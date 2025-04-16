import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  product: null,
  error: null,
  products: [],
  rowCount: 0,
  pageCount: 1
};

const ProductSlice = createSlice({
  name: 'product',
  initialState: initialState,
  reducers: {
    getProductsStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    getProductsByAdminStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    getProductsSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload.content;
      state.rowCount = action.payload?.totalElements || 1;
      state.pageCount = action.payload?.totalPages || 1;
    },
    getProductsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    getProductStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    getProductSuccess: (state, action) => {
      state.loading = false;
      state.product = action.payload;
    },
    getProductFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    createProductStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    createProductSuccess: (state, action) => {
      state.products.push(action.payload);
      state.loading = false;
      state.rowCount = state.rowCount + 1;
    },
    createProductFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateProductStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    updateProductSuccess: (state, action) => {
      const index = state.products.findIndex((product) => product.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload; // Cập nhật product tại vị trí tìm thấy
      }
      state.loading = false;
    },
    updateProductFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteProductStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    deleteProductSuccess: (state, action) => {
      state.products = state.products.filter((product) => {
        return product.id != action.payload;
      }); // Xóa product dựa vào id
      state.loading = false;
      state.rowCount = state.rowCount - 1;
    },
    deleteProductFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const {
  createProductStart,
  createProductSuccess,
  createProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  getProductsSuccess,
  getProductsStart,
  getProductsFailure,
  getProductsByAdminStart,
  getProductFailure,
  getProductSuccess,
  getProductStart
} = ProductSlice.actions;

export default ProductSlice.reducer;
