import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  success: null,
  post: null,
  posts: [],
  rowCount: 0,
  pageCount: 1,
  comment: null,
  comments: [],
  favorite: null,
  favorites: []
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    // ✅ Fetch all posts
    getPostsStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    getPostsSuccess: (state, action) => {
      state.posts = action.payload.content;
      state.rowCount = action.payload?.totalElements || 1;
      state.pageCount = action.payload?.totalPages || 1;
      state.loading = false;
    },
    getPostsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // ✅ Fetch a single post
    getPostStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    getPostSuccess: (state, action) => {
      state.post = action.payload;
      state.loading = false;
    },
    getPostFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // ✅ Create a post
    createPostStart: (state, action) => {
      state.loading = true;
      state.success = null;
      state.error = null;
    },
    createPostSuccess: (state, action) => {
      state.posts.push(action.payload);
      state.loading = false;
      state.success = true;
    },
    createPostFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // ✅ Update a post
    updatePostStart: (state, action) => {
      state.loading = true;
      state.success = null;
      state.error = null;
    },
    updatePostSuccess: (state, action) => {
      const index = state.posts.findIndex((post) => post.id === action.payload.id);
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
      state.loading = false;
      state.success = true;
    },
    updatePostFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // ✅ Delete a post
    deletePostStart: (state, action) => {
      state.loading = true;
      state.success = null;
      state.error = null;
    },
    deletePostSuccess: (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
      state.loading = false;
      state.success = true;
    },
    deletePostFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // ✅ Fetch comments
    getCommentsStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    getCommentsSuccess: (state, action) => {
      state.comments = action.payload.content;
      state.loading = false;
    },
    getCommentsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // ✅ Create a comment
    createCommentStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    createCommentSuccess: (state, action) => {
      state.comments.push(action.payload);
      state.loading = false;
      state.success = true;
    },
    createCommentFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // ✅ Delete a comment
    deleteCommentStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    deleteCommentSuccess: (state, action) => {
      state.comments = state.comments.filter((comment) => comment.id !== action.payload);
      state.loading = false;
      state.success = true;
    },
    deleteCommentFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // ✅ Like a post
    likePostStart: (state, action) => {
      state.loading = true;
    },
    likePostSuccess: (state, action) => {
      state.favorite = action.payload;
      state.loading = false;
    },
    likePostFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // ✅ Unlike a post
    unlikePostStart: (state, action) => {
      state.loading = true;
    },
    unlikePostSuccess: (state, action) => {
      state.favorite = null;
      state.loading = false;
    },
    unlikePostFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const {
  getPostsStart,
  getPostsSuccess,
  getPostsFailure,
  getPostStart,
  getPostSuccess,
  getPostFailure,
  createPostStart,
  createPostSuccess,
  createPostFailure,
  updatePostStart,
  updatePostSuccess,
  updatePostFailure,
  deletePostStart,
  deletePostSuccess,
  deletePostFailure,
  getCommentsStart,
  getCommentsSuccess,
  getCommentsFailure,
  createCommentStart,
  createCommentSuccess,
  createCommentFailure,
  deleteCommentStart,
  deleteCommentSuccess,
  deleteCommentFailure,
  likePostStart,
  likePostSuccess,
  likePostFailure,
  unlikePostStart,
  unlikePostSuccess,
  unlikePostFailure
} = postSlice.actions;

export default postSlice.reducer;
