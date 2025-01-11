import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  type: null,
  error: null,
  success: null,
  meta: null,
  types: [],
  rowCount: 0,
  pageCount: 1
};

const typeSlice = createSlice({
  initialState,
  name: 'productType',
  reducers: {
    getTypesStart: (state, action) => {
      state.loading = true;
      state.success = null;
      state.types = [];
      state.error = null;
    },
    getTypesSuccess: (state, action) => {
      state.types = action.payload.content;
      state.rowCount = action.payload?.totalElements || 1;
      state.pageCount = action.payload?.totalPages || 1;
      state.loading = false;
    },
    getTypesFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    getTypeStart: (state, action) => {
      state.loading = true;
      state.success = null;
      state.type = null;
      state.error = null;
    },
    getTypeSuccess: (state, action) => {
      state.types = action.payload.content;
      state.type = action.payload;
      state.loading = false;
    },
    getTypeFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    createTypeStart: (state, action) => {
      state.loading = true;
      state.success = null;
      state.type = null;
      state.error = null;
    },
    createTypeSuccess: (state, action) => {
      state.types.push(action.payload);
      state.loading = false;
      state.success = true;
    },
    createTypeFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateTypeStart: (state, action) => {
      state.loading = true;
      state.success = null;
      state.type = null;
      state.error = null;
    },
    updateTypeSuccess: (state, action) => {
      const index = state.types.findIndex((type) => type.id === action.payload.id);
      if (index !== -1) {
        state.types[index] = action.payload;
      }
      state.loading = false;
      state.success = true;
    },
    updateTypeFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteTypeStart: (state, action) => {
      state.loading = true;
      state.success = null;
      state.type = null;
      state.error = null;
    },
    deleteTypeSuccess: (state, action) => {
      state.types = state.types.filter((type) => type.id != action.payload);
      state.loading = false;
      state.success = true;
    },
    deleteTypeFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const {
  getTypesStart,
  getTypesSuccess,
  getTypesFailure,
  createTypeSuccess,
  createTypeFailure,
  deleteTypeFailure,
  deleteTypeStart,
  deleteTypeSuccess,
  createTypeStart,
  getTypeFailure,
  getTypeSuccess,
  updateTypeFailure,
  updateTypeStart,
  updateTypeSuccess,
  getTypeStart
} = typeSlice.actions;

export default typeSlice.reducer;
