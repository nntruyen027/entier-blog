import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  attributeValue: null,
  error: null,
  success: null,
  meta: null,
  attributeValues: [],
  rowCount: 0,
  pageCount: 1
};

const attributeValueSlice = createSlice({
  initialState,
  name: 'attributeValue',
  reducers: {
    getAttributeValuesStart: (state, action) => {
      state.loading = true;
      state.success = null;
      state.attributeValues = [];
      state.error = null;
    },
    getAttributeValuesSuccess: (state, action) => {
      state.attributeValues = action.payload.content;
      state.rowCount = action.payload?.totalElements || 1;
      state.pageCount = action.payload?.totalPages || 1;
      state.loading = false;
    },
    getAttributeValuesFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    getAttributeValueStart: (state, action) => {
      state.loading = true;
      state.success = null;
      state.attributeValue = null;
      state.error = null;
    },
    getAttributeValueSuccess: (state, action) => {
      state.attributeValues = action.payload.content;
      state.attributeValue = action.payload;
      state.loading = false;
    },
    getAttributeValueFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    createAttributeValueStart: (state, action) => {
      state.loading = true;
      state.success = null;
      state.attributeValue = null;
      state.error = null;
    },
    createAttributeValueSuccess: (state, action) => {
      state.attributeValues.push(action.payload);
      state.loading = false;
      state.success = true;
    },
    createAttributeValueFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateAttributeValueStart: (state, action) => {
      state.loading = true;
      state.success = null;
      state.attributeValue = null;
      state.error = null;
    },
    updateAttributeValueSuccess: (state, action) => {
      const index = state.attributeValues.findIndex((attributeValue) => attributeValue.id === action.payload.id);
      if (index !== -1) {
        state.attributeValues[index] = action.payload;
      }
      state.loading = false;
      state.success = true;
    },
    updateAttributeValueFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteAttributeValueStart: (state, action) => {
      state.loading = true;
      state.success = null;
      state.attributeValue = null;
      state.error = null;
    },
    deleteAttributeValueSuccess: (state, action) => {
      state.attributeValues = state.attributeValues.filter((attributeValue) => attributeValue.id != action.payload);
      state.loading = false;
      state.success = true;
    },
    deleteAttributeValueFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const {
  getAttributeValuesStart,
  getAttributeValuesSuccess,
  getAttributeValuesFailure,
  createAttributeValueSuccess,
  createAttributeValueFailure,
  deleteAttributeValueFailure,
  deleteAttributeValueStart,
  deleteAttributeValueSuccess,
  createAttributeValueStart,
  getAttributeValueFailure,
  getAttributeValueSuccess,
  updateAttributeValueFailure,
  updateAttributeValueStart,
  updateAttributeValueSuccess,
  getAttributeValueStart
} = attributeValueSlice.actions;

export default attributeValueSlice.reducer;
