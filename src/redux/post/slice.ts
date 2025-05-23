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
    getFavoritePostStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    getPostsByNoAdminStart: (state, action) => {
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
      state.post = action.payload;
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
    likePostStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    unlikePostStart: (state, action) => {
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
    likeAndUnlikePostSuccess: (state, action) => {
      state.post.liked = !state.post.liked;
      state.post.likeCount = state.post.liked ? state.post.likeCount + 1 : state.post.likeCount - 1;
      state.loading = false;
    },
    likeAndUnlikePostFailure: (state, action) => {
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
    },
    createCommentStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    createCommentSuccess: (state, action) => {
      state.post.comments.push(action.payload);
      state.loading = false;
    },
    createCommentFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateCommentStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    updateCommentSuccess: (state, action) => {
      const index = state.post.comments.findIndex((e) => e.id === action.payload.id);
      if (index !== -1) {
        state.post.comments[index] = action.payload;
      }
      state.loading = false;
    },
    updateCommentFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteCommentStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    deleteCommentSuccess: (state, action) => {
      console.log(
        state.post.comments.findIndex((e) => e.id === action.payload),
        action.payload
      );
      const index = state.post.comments.findIndex((e) => e.id === action.payload);
      if (index !== -1) {
        state.post.comments.splice(index, 1);
      }
    },
    deleteCommentFailure: (state, action) => {
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
  asignTagToPostStart,
  getPostsByNoAdminStart,
  likePostStart,
  unlikePostStart,
  likeAndUnlikePostFailure,
  likeAndUnlikePostSuccess,
  createCommentStart,
  createCommentSuccess,
  createCommentFailure,
  updateCommentStart,
  updateCommentSuccess,
  deleteCommentStart,
  deleteCommentSuccess,
  deleteCommentFailure,
  updateCommentFailure,
  getFavoritePostStart
} = PostSlice.actions;

export default PostSlice.reducer;
