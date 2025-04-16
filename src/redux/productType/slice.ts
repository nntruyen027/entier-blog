import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  productType: null,
  error: null,
  productTypes: [],
  rowCount: 0,
  pageCount: 1
};

const ProductTypeSlice = createSlice({
  name: 'productType',
  initialState: initialState,
  reducers: {
    getProductTypesStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    getProductTypesSuccess: (state, action) => {
      state.loading = false;
      state.productTypes = action.payload.content;
      state.rowCount = action.payload?.totalElements || 1;
      state.pageCount = action.payload?.totalPages || 1;
    },
    getProductTypesFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    getProductTypeStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    getProductTypeSuccess: (state, action) => {
      state.loading = false;
      state.productType = action.payload;
    },
    getProductTypeFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    createProductTypeStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    createProductTypeSuccess: (state, action) => {
      state.productTypes.push(action.payload);
      state.loading = false;
      state.rowCount = state.rowCount + 1;
    },
    createProductTypeFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateProductTypeStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    updateProductTypeSuccess: (state, action) => {
      const index = state.productTypes.findIndex((productType) => productType.id === action.payload.id);
      if (index !== -1) {
        state.productTypes[index] = action.payload; // Cập nhật productType tại vị trí tìm thấy
      }
      state.loading = false;
    },
    updateProductTypeFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteProductTypeStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    deleteProductTypeSuccess: (state, action) => {
      state.productTypes = state.productTypes.filter((productType) => {
        return productType.id != action.payload;
      }); // Xóa productType dựa vào id
      state.loading = false;
      state.rowCount = state.rowCount - 1;
    },
    deleteProductTypeFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const {
  createProductTypeStart,
  createProductTypeSuccess,
  createProductTypeFailure,
  deleteProductTypeStart,
  deleteProductTypeSuccess,
  deleteProductTypeFailure,
  updateProductTypeFailure,
  updateProductTypeStart,
  updateProductTypeSuccess,
  getProductTypesSuccess,
  getProductTypesStart,
  getProductTypesFailure,
  getProductTypeFailure,
  getProductTypeSuccess,
  getProductTypeStart
} = ProductTypeSlice.actions;

export default ProductTypeSlice.reducer;
