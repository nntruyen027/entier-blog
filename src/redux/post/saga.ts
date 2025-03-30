import { call, put, takeLatest } from 'redux-saga/effects';
import {
  createCommentFailure,
  createCommentStart,
  createCommentSuccess,
  createPostFailure,
  createPostStart,
  createPostSuccess,
  deleteCommentFailure,
  deleteCommentStart,
  deleteCommentSuccess,
  deletePostFailure,
  deletePostStart,
  deletePostSuccess,
  getCommentsFailure,
  getCommentsStart,
  getCommentsSuccess,
  getPostFailure,
  getPostsFailure,
  getPostsStart,
  getPostsSuccess,
  getPostStart,
  getPostSuccess,
  likePostFailure,
  likePostStart,
  likePostSuccess,
  unlikePostFailure,
  unlikePostStart,
  unlikePostSuccess,
  updatePostFailure,
  updatePostStart,
  updatePostSuccess
} from './slice';
import {
  createComment,
  createOne,
  deleteComment,
  deleteOne,
  getAll,
  getComments,
  getOne,
  like,
  unLike,
  updateOne
} from './api';

// ✅ Fetch all posts
function* getAllRequest(action) {
  try {
    const { data } = yield call(getAll, action.payload);
    yield put(getPostsSuccess(data));
  } catch (error) {
    yield put(getPostsFailure(error));
  }
}

// ✅ Fetch a single post
function* getOneRequest(action) {
  try {
    const { data } = yield call(getOne, action.payload);
    yield put(getPostSuccess(data));
  } catch (error) {
    yield put(getPostFailure(error));
  }
}

// ✅ Create a post
function* createOneRequest(action) {
  try {
    const { data } = yield call(createOne, action.payload);
    yield put(createPostSuccess(data));
  } catch (error) {
    yield put(createPostFailure(error));
  }
}

// ✅ Update a post
function* updateOneRequest(action) {
  try {
    const { data } = yield call(updateOne, action.payload);
    yield put(updatePostSuccess(data));
  } catch (error) {
    yield put(updatePostFailure(error));
  }
}

// ✅ Delete a post
function* deleteOneRequest(action) {
  try {
    yield call(deleteOne, action.payload);
    yield put(deletePostSuccess(action.payload));
  } catch (error) {
    yield put(deletePostFailure(error));
  }
}

// ✅ Fetch comments
function* getCommentsRequest(action) {
  try {
    const { data } = yield call(getComments, action.payload);
    yield put(getCommentsSuccess(data));
  } catch (error) {
    yield put(getCommentsFailure(error));
  }
}

// ✅ Create a comment
function* createCommentRequest(action) {
  try {
    const { data } = yield call(createComment, action.payload);
    yield put(createCommentSuccess(data));
  } catch (error) {
    yield put(createCommentFailure(error));
  }
}

// ✅ Delete a comment
function* deleteCommentRequest(action) {
  try {
    yield call(deleteComment, action.payload);
    yield put(deleteCommentSuccess(action.payload));
  } catch (error) {
    yield put(deleteCommentFailure(error));
  }
}

// ✅ Like a post
function* likePostRequest(action) {
  try {
    const { data } = yield call(like, action.payload);
    yield put(likePostSuccess(data));
  } catch (error) {
    yield put(likePostFailure(error));
  }
}

// ✅ Unlike a post
function* unlikePostRequest(action) {
  try {
    yield call(unLike, action.payload);
    yield put(unlikePostSuccess(action.payload));
  } catch (error) {
    yield put(unlikePostFailure(error));
  }
}

function* postSaga() {
  yield takeLatest(getPostsStart.type, getAllRequest);
  yield takeLatest(getPostStart.type, getOneRequest);
  yield takeLatest(createPostStart.type, createOneRequest);
  yield takeLatest(updatePostStart.type, updateOneRequest);
  yield takeLatest(deletePostStart.type, deleteOneRequest);

  yield takeLatest(getCommentsStart.type, getCommentsRequest);
  yield takeLatest(createCommentStart.type, createCommentRequest);
  yield takeLatest(deleteCommentStart.type, deleteCommentRequest);

  yield takeLatest(likePostStart.type, likePostRequest);
  yield takeLatest(unlikePostStart.type, unlikePostRequest);
}

export default postSaga;
