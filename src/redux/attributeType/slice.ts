import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  attributeType: null,
  error: null,
  success: null,
  meta: null,
  attributeTypes: [],
  rowCount: 0,
  pageCount: 1
};

const attributeTypeSlice = createSlice({
  initialState,
  name: 'attributeType',
  reducers: {
    getAttributeTypesStart: (state, action) => {
      state.loading = true;
      state.success = null;
      state.attributeTypes = [];
      state.error = null;
    },
    getAttributeTypesSuccess: (state, action) => {
      state.attributeTypes = action.payload.content;
      state.rowCount = action.payload?.totalElements || 1;
      state.pageCount = action.payload?.totalPages || 1;
      state.loading = false;
    },
    getAttributeTypesFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    getAttributeTypeStart: (state, action) => {
      state.loading = true;
      state.success = null;
      state.attributeType = null;
      state.error = null;
    },
    getAttributeTypeSuccess: (state, action) => {
      state.attributeTypes = action.payload.content;
      state.attributeType = action.payload;
      state.loading = false;
    },
    getAttributeTypeFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    createAttributeTypeStart: (state, action) => {
      state.loading = true;
      state.success = null;
      state.attributeType = null;
      state.error = null;
    },
    createAttributeTypeSuccess: (state, action) => {
      state.attributeTypes.push(action.payload);
      state.loading = false;
      state.success = true;
    },
    createAttributeTypeFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateAttributeTypeStart: (state, action) => {
      state.loading = true;
      state.success = null;
      state.attributeType = null;
      state.error = null;
    },
    updateAttributeTypeSuccess: (state, action) => {
      const index = state.attributeTypes.findIndex((attributeType) => attributeType.id === action.payload.id);
      if (index !== -1) {
        state.attributeTypes[index] = action.payload;
      }
      state.loading = false;
      state.success = true;
    },
    updateAttributeTypeFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteAttributeTypeStart: (state, action) => {
      state.loading = true;
      state.success = null;
      state.attributeType = null;
      state.error = null;
    },
    deleteAttributeTypeSuccess: (state, action) => {
      state.attributeTypes = state.attributeTypes.filter((attributeType) => attributeType.id != action.payload);
      state.loading = false;
      state.success = true;
    },
    deleteAttributeTypeFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const {
  getAttributeTypesStart,
  getAttributeTypesSuccess,
  getAttributeTypesFailure,
  createAttributeTypeSuccess,
  createAttributeTypeFailure,
  deleteAttributeTypeFailure,
  deleteAttributeTypeStart,
  deleteAttributeTypeSuccess,
  createAttributeTypeStart,
  getAttributeTypeFailure,
  getAttributeTypeSuccess,
  updateAttributeTypeFailure,
  updateAttributeTypeStart,
  updateAttributeTypeSuccess,
  getAttributeTypeStart
} = attributeTypeSlice.actions;

export default attributeTypeSlice.reducer;
