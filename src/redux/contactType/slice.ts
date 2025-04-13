import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  tag: null,
  error: null,
  tags: [],
  rowCount: 0,
  pageCount: 1
};

const TagSlice = createSlice({
  name: 'tag',
  initialState: initialState,
  reducers: {
    getTagsStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    getTagsSuccess: (state, action) => {
      state.loading = false;
      state.tags = action.payload.content;
      state.rowCount = action.payload?.totalElements || 1;
      state.pageCount = action.payload?.totalPages || 1;
    },
    getTagsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    createTagStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    createTagSuccess: (state, action) => {
      state.tags.push(action.payload);
      state.loading = false;
      state.rowCount = state.rowCount + 1;
    },
    createTagFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateTagStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    updateTagSuccess: (state, action) => {
      const index = state.tags.findIndex((tag) => tag.id === action.payload.id);
      if (index !== -1) {
        state.tags[index] = action.payload; // Cập nhật tag tại vị trí tìm thấy
      }
      state.loading = false;
    },
    updateTagFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteTagStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    deleteTagSuccess: (state, action) => {
      state.tags = state.tags.filter((tag) => {
        return tag.id != action.payload;
      }); // Xóa tag dựa vào id
      state.loading = false;
      state.rowCount = state.rowCount - 1;
    },
    deleteTagFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const {
  createTagStart,
  createTagSuccess,
  createTagFailure,
  deleteTagStart,
  deleteTagSuccess,
  deleteTagFailure,
  updateTagFailure,
  updateTagStart,
  updateTagSuccess,
  getTagsSuccess,
  getTagsStart,
  getTagsFailure
} = TagSlice.actions;

export default TagSlice.reducer;
