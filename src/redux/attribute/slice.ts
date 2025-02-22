import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  attribute: null,
  error: null,
  success: null,
  meta: null,
  attributes: [],
  rowCount: 0,
  pageCount: 1
};

const attributeSlice = createSlice({
  initialState,
  name: 'attribute',
  reducers: {
    getAttributesStart: (state, action) => {
      state.loading = true;
      state.success = null;
      state.attributes = [];
      state.error = null;
    },
    getAttributesSuccess: (state, action) => {
      state.attributes = action.payload.content;
      state.rowCount = action.payload?.totalElements || 1;
      state.pageCount = action.payload?.totalPages || 1;
      state.loading = false;
    },
    getAttributesFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    getAttributeStart: (state, action) => {
      state.loading = true;
      state.success = null;
      state.attribute = null;
      state.error = null;
    },
    getAttributeSuccess: (state, action) => {
      state.attributes = action.payload.content;
      state.attribute = action.payload;
      state.loading = false;
    },
    getAttributeFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    createAttributeStart: (state, action) => {
      state.loading = true;
      state.success = null;
      state.attribute = null;
      state.error = null;
    },
    createAttributeSuccess: (state, action) => {
      state.attributes.push(action.payload);
      state.loading = false;
      state.success = true;
    },
    createAttributeFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateAttributeStart: (state, action) => {
      state.loading = true;
      state.success = null;
      state.attribute = null;
      state.error = null;
    },
    updateAttributeSuccess: (state, action) => {
      const index = state.attributes.findIndex((attribute) => attribute.id === action.payload.id);
      if (index !== -1) {
        state.attributes[index] = action.payload;
      }
      state.loading = false;
      state.success = true;
    },
    updateAttributeFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteAttributeStart: (state, action) => {
      state.loading = true;
      state.success = null;
      state.attribute = null;
      state.error = null;
    },
    deleteAttributeSuccess: (state, action) => {
      state.attributes = state.attributes.filter((attribute) => attribute.id != action.payload);
      state.loading = false;
      state.success = true;
    },
    deleteAttributeFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const {
  getAttributesStart,
  getAttributesSuccess,
  getAttributesFailure,
  createAttributeSuccess,
  createAttributeFailure,
  deleteAttributeFailure,
  deleteAttributeStart,
  deleteAttributeSuccess,
  createAttributeStart,
  getAttributeFailure,
  getAttributeSuccess,
  updateAttributeFailure,
  updateAttributeStart,
  updateAttributeSuccess,
  getAttributeStart
} = attributeSlice.actions;

export default attributeSlice.reducer;
