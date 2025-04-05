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
  getFavoritesFailure,
  getFavoritesStart,
  getFavoritesSuccess,
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
  getPostFavorite,
  like,
  unLike,
  updateOne
} from './api';
import { showNotification } from '~/redux/noti/slice'; // Giả sử bạn có một slice quản lý thông báo

function* getAllRequest(action) {
  try {
    const { data } = yield call(getAll, action.payload);
    yield put(getPostsSuccess(data));
  } catch (error) {
    yield put(getPostsFailure(error));
    yield put(showNotification({ message: 'Lấy bài viết thất bại!', variant: 'error' }));
  }
}

function* getOneRequest(action) {
  try {
    const { data } = yield call(getOne, action.payload);
    yield put(getPostSuccess(data));
  } catch (error) {
    yield put(getPostFailure(error));
    yield put(showNotification({ message: 'Lấy bài viết thất bại!', variant: 'error' }));
  }
}

function* createOneRequest(action) {
  try {
    const { data } = yield call(createOne, action.payload);
    yield put(createPostSuccess(data));
    yield put(showNotification({ message: 'Tạo bài viết thành công!', variant: 'success' }));
  } catch (error) {
    yield put(createPostFailure(error));
    yield put(showNotification({ message: 'Tạo bài viết thất bại!', variant: 'error' }));
  }
}

function* updateOneRequest(action) {
  try {
    const { data } = yield call(updateOne, action.payload);
    yield put(updatePostSuccess(data));
    yield put(showNotification({ message: 'Cập nhật bài viết thành công!', variant: 'success' }));
  } catch (error) {
    yield put(updatePostFailure(error));
    yield put(showNotification({ message: 'Cập nhật bài viết thất bại!', variant: 'error' }));
  }
}

function* deleteOneRequest(action) {
  try {
    yield call(deleteOne, action.payload);
    yield put(deletePostSuccess(action.payload));
    yield put(showNotification({ message: 'Xóa bài viết thành công!', variant: 'success' }));
  } catch (error) {
    yield put(deletePostFailure(error));
    yield put(showNotification({ message: 'Xóa bài viết thất bại!', variant: 'error' }));
  }
}

function* getCommentsRequest(action) {
  try {
    const { data } = yield call(getComments, action.payload);
    yield put(getCommentsSuccess(data));
  } catch (error) {
    yield put(getCommentsFailure(error));
    yield put(showNotification({ message: 'Lấy bình luận thất bại!', variant: 'error' }));
  }
}

function* getFavouritesRequest(action) {
  try {
    const { data } = yield call(getPostFavorite, action.payload);
    yield put(getFavoritesSuccess(data));
  } catch (error) {
    yield put(getFavoritesFailure(error));
    yield put(showNotification({ message: 'Lấy bài viết yêu thích thất bại!', variant: 'error' }));
  }
}

function* createCommentRequest(action) {
  try {
    const { data } = yield call(createComment, action.payload);
    yield put(createCommentSuccess(data));
    yield put(showNotification({ message: 'Tạo bình luận thành công!', variant: 'success' }));
  } catch (error) {
    yield put(createCommentFailure(error));
    yield put(showNotification({ message: 'Tạo bình luận thất bại!', variant: 'error' }));
  }
}

function* deleteCommentRequest(action) {
  try {
    yield call(deleteComment, action.payload);
    yield put(deleteCommentSuccess(action.payload));
    yield put(showNotification({ message: 'Xóa bình luận thành công!', variant: 'success' }));
  } catch (error) {
    yield put(deleteCommentFailure(error));
    yield put(showNotification({ message: 'Xóa bình luận thất bại!', variant: 'error' }));
  }
}

function* likePostRequest(action) {
  try {
    const { data } = yield call(like, action.payload);
    yield put(likePostSuccess(data));
    yield put(showNotification({ message: 'Thích bài viết thành công!', variant: 'success' }));
  } catch (error) {
    yield put(likePostFailure(error));
    yield put(showNotification({ message: 'Thích bài viết thất bại!', variant: 'error' }));
  }
}

function* unlikePostRequest(action) {
  try {
    yield call(unLike, action.payload);
    yield put(unlikePostSuccess(action.payload));
    yield put(showNotification({ message: 'Bỏ thích bài viết thành công!', variant: 'success' }));
  } catch (error) {
    yield put(unlikePostFailure(error));
    yield put(showNotification({ message: 'Bỏ thích bài viết thất bại!', variant: 'error' }));
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
  yield takeLatest(getFavoritesStart.type, getFavouritesRequest);

  yield takeLatest(likePostStart.type, likePostRequest);
  yield takeLatest(unlikePostStart.type, unlikePostRequest);
}

export default postSaga;
