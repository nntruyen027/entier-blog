import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  brand: null,
  error: null,
  success: null,
  meta: null,
  brands: [],
  rowCount: 0,
  pageCount: 1
};

const brandSlice = createSlice({
  initialState,
  name: 'productBrand',
  reducers: {
    getBrandsStart: (state, action) => {
      state.loading = true;
      state.success = null;
      state.brands = [];
      state.error = null;
    },
    getBrandsSuccess: (state, action) => {
      state.brands = action.payload.content;
      state.rowCount = action.payload?.totalElements || 1;
      state.pageCount = action.payload?.totalPages || 1;
      state.loading = false;
    },
    getBrandsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    getBrandStart: (state, action) => {
      state.loading = true;
      state.success = null;
      state.brand = null;
      state.error = null;
    },
    getBrandSuccess: (state, action) => {
      state.brands = action.payload.content;
      state.brand = action.payload;
      state.loading = false;
    },
    getBrandFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    createBrandStart: (state, action) => {
      state.loading = true;
      state.success = null;
      state.brand = null;
      state.error = null;
    },
    createBrandSuccess: (state, action) => {
      state.brands.push(action.payload);
      state.loading = false;
      state.success = true;
    },
    createBrandFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateBrandStart: (state, action) => {
      state.loading = true;
      state.success = null;
      state.brand = null;
      state.error = null;
    },
    updateBrandSuccess: (state, action) => {
      const index = state.brands.findIndex((brand) => brand.id === action.payload.id);
      if (index !== -1) {
        state.brands[index] = action.payload;
      }
      state.loading = false;
      state.success = true;
    },
    updateBrandFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteBrandStart: (state, action) => {
      state.loading = true;
      state.success = null;
      state.brand = null;
      state.error = null;
    },
    deleteBrandSuccess: (state, action) => {
      state.brands = state.brands.filter((brand) => brand.id != action.payload);
      state.loading = false;
      state.success = true;
    },
    deleteBrandFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const {
  getBrandsStart,
  getBrandsSuccess,
  getBrandsFailure,
  createBrandSuccess,
  createBrandFailure,
  deleteBrandFailure,
  deleteBrandStart,
  deleteBrandSuccess,
  createBrandStart,
  getBrandFailure,
  getBrandSuccess,
  updateBrandFailure,
  updateBrandStart,
  updateBrandSuccess,
  getBrandStart
} = brandSlice.actions;

export default brandSlice.reducer;
