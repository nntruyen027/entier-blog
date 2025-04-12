import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  post: null,
  error: null,
  posts: [],
  rowCount: 0,
  pageCount: 1
};

const PostSlice = createSlice({
  name: 'post',
  initialState: initialState,
  reducers: {
    getPostsStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    getPostsSuccess: (state, action) => {
      state.loading = false;
      state.posts = action.payload.content;
      state.rowCount = action.payload?.totalElements || 1;
      state.pageCount = action.payload?.totalPages || 1;
    },
    getPostFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    getPostStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    getPostSuccess: (state, action) => {
      state.loading = false;
      state.post = action.payload.content;
    },
    getPostsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    createPostStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    createPostSuccess: (state, action) => {
      state.posts.push(action.payload);
      state.rowCount = state.rowCount + 1;
      state.loading = false;
    },
    createPostFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updatePostStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    asignTagToPostStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    updatePostSuccess: (state, action) => {
      const index = state.posts.findIndex((post) => post.id === action.payload.id);
      if (index !== -1) {
        state.posts[index] = action.payload; // Cập nhật post tại vị trí tìm thấy
      }
      state.loading = false;
    },
    updatePostFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deletePostStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    deletePostSuccess: (state, action) => {
      state.posts = state.posts.filter((post) => {
        return post.id != action.payload;
      }); // Xóa post dựa vào id
      state.loading = false;
      state.rowCount = state.rowCount - 1;
    },
    deletePostFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const {
  createPostStart,
  createPostSuccess,
  createPostFailure,
  deletePostStart,
  deletePostSuccess,
  deletePostFailure,
  updatePostFailure,
  updatePostStart,
  updatePostSuccess,
  getPostsSuccess,
  getPostsStart,
  getPostsFailure,
  getPostStart,
  getPostSuccess,
  getPostFailure,
  asignTagToPostStart
} = PostSlice.actions;

export default PostSlice.reducer;
