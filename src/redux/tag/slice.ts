import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  tag: null,
  error: null,
  success: null,
  meta: null,
  tags: [],
  rowCount: 0,
  pageCount: 1
};

const tagSlice = createSlice({
  initialState,
  name: 'tag',
  reducers: {
    getTagsStart: (state, action) => {
      state.loading = true;
      state.success = null;
      state.tags = [];
      state.error = null;
    },
    getTagsSuccess: (state, action) => {
      state.tags = action.payload.content;
      state.rowCount = action.payload?.totalElements || 1;
      state.pageCount = action.payload?.totalPages || 1;
      state.loading = false;
    },
    getTagsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    getTagStart: (state, action) => {
      state.loading = true;
      state.success = null;
      state.tag = null;
      state.error = null;
    },
    getTagSuccess: (state, action) => {
      state.tags = action.payload.content;
      state.tag = action.payload;
      state.loading = false;
    },
    getTagFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    createTagStart: (state, action) => {
      state.loading = true;
      state.success = null;
      state.tag = null;
      state.error = null;
    },
    createTagSuccess: (state, action) => {
      state.tags.push(action.payload);
      state.loading = false;
      state.success = true;
    },
    createTagFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateTagStart: (state, action) => {
      state.loading = true;
      state.success = null;
      state.tag = null;
      state.error = null;
    },
    updateTagSuccess: (state, action) => {
      const index = state.tags.findIndex((tag) => tag.id === action.payload.id);
      if (index !== -1) {
        state.tags[index] = action.payload;
      }
      state.loading = false;
      state.success = true;
    },
    updateTagFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteTagStart: (state, action) => {
      state.loading = true;
      state.success = null;
      state.tag = null;
      state.error = null;
    },
    deleteTagSuccess: (state, action) => {
      state.tags = state.tags.filter((tag) => tag.id != action.payload);
      state.loading = false;
      state.success = true;
    },
    deleteTagFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const {
  getTagsStart,
  getTagsSuccess,
  getTagsFailure,
  createTagSuccess,
  createTagFailure,
  deleteTagFailure,
  deleteTagStart,
  deleteTagSuccess,
  createTagStart,
  getTagFailure,
  getTagSuccess,
  updateTagFailure,
  updateTagStart,
  updateTagSuccess,
  getTagStart
} = tagSlice.actions;

export default tagSlice.reducer;
