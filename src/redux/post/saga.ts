import {
  asignTag,
  createComment,
  createOne,
  deleteComment,
  deleteOne,
  getAll,
  getAllNoAdmin,
  getFavorites,
  getOne,
  likeOne,
  unlikeOne,
  updateComment,
  updateOne
} from './api';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  asignTagToPostStart,
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
  getFavoritePostStart,
  getPostFailure,
  getPostsByNoAdminStart,
  getPostsFailure,
  getPostsStart,
  getPostsSuccess,
  getPostStart,
  getPostSuccess,
  likeAndUnlikePostFailure,
  likeAndUnlikePostSuccess,
  likePostStart,
  unlikePostStart,
  updateCommentFailure,
  updateCommentStart,
  updateCommentSuccess,
  updatePostFailure,
  updatePostStart,
  updatePostSuccess
} from './slice';
import { showNotification } from '~/redux/noti/slice'; // Giả sử bạn có slice thông báo

function* getPostsRequest(action) {
  try {
    const { data } = yield call(getAll, action.payload);
    yield put(getPostsSuccess(data));
  } catch (error) {
    yield put(getPostsFailure(error));
    yield put(showNotification({ message: 'Lấy danh sách bài viết thất bại!', variant: 'error' }));
  }
}

function* getFavouritePostsRequest(action) {
  try {
    const { data } = yield call(getFavorites, action.payload);
    yield put(getPostsSuccess(data));
  } catch (error) {
    yield put(getPostsFailure(error));
    yield put(showNotification({ message: 'Lấy danh sách bài viết thất bại!', variant: 'error' }));
  }
}

function* getPostsByNotAdminRequest(action) {
  try {
    const { data } = yield call(getAllNoAdmin, action.payload);
    yield put(getPostsSuccess(data));
  } catch (error) {
    yield put(getPostsFailure(error));
    yield put(showNotification({ message: 'Lấy danh sách bài viết thất bại!', variant: 'error' }));
  }
}

function* getPostRequest(action) {
  try {
    const { data } = yield call(getOne, action.payload);
    yield put(getPostSuccess(data));
  } catch (error) {
    yield put(getPostFailure(error));
    yield put(showNotification({ message: 'Lấy bài viết thất bại!', variant: 'error' }));
  }
}

function* createPostRequest(action) {
  try {
    const { data } = yield call(createOne, action.payload);
    yield put(createPostSuccess(data));
    yield put(showNotification({ message: 'Tạo bài viết thành công!', variant: 'success' }));
  } catch (error) {
    yield put(createPostFailure(error));
    yield put(showNotification({ message: 'Tạo bài viết thất bại!', variant: 'error' }));
  }
}

function* updatePostRequest(action) {
  try {
    const { data } = yield call(updateOne, action.payload);
    yield put(updateCommentSuccess(data));
    yield put(showNotification({ message: 'Cập nhật bài viết thành công!', variant: 'success' }));
  } catch (error) {
    yield put(updatePostFailure(error));
    yield put(showNotification({ message: 'Cập nhật bài viết thất bại!', variant: 'error' }));
  }
}

function* asignTagToPostRequest(action) {
  try {
    const { data } = yield call(asignTag, action.payload);
    yield put(updatePostSuccess(data));
    yield put(showNotification({ message: 'Gán thẻ thành công!', variant: 'success' }));
  } catch (error) {
    yield put(updatePostFailure(error));
    yield put(showNotification({ message: 'Gán thẻ thất bại!', variant: 'error' }));
  }
}

function* deletePostRequest(action) {
  try {
    yield call(deleteOne, action.payload);
    yield put(deletePostSuccess(action.payload));
    yield put(showNotification({ message: 'Xóa bài viết thành công!', variant: 'success' }));
  } catch (error) {
    yield put(deletePostFailure(error));
    yield put(showNotification({ message: 'Xóa bài viết thất bại!', variant: 'error' }));
  }
}

function* likePostRequest(action) {
  try {
    yield call(likeOne, action.payload);
    yield put(likeAndUnlikePostSuccess(action.payload));
  } catch (error) {
    yield put(likeAndUnlikePostFailure(error));
  }
}

function* unlikePostRequest(action) {
  try {
    yield call(unlikeOne, action.payload);
    yield put(likeAndUnlikePostSuccess(action.payload));
  } catch (error) {
    yield put(likeAndUnlikePostFailure(error));
  }
}

function* createCommentRequest(action) {
  try {
    const { data } = yield call(createComment, action.payload);
    yield put(createCommentSuccess(data));
  } catch (error) {
    yield put(createCommentFailure(error));
    yield put(showNotification({ message: 'Bình luận bài viết thất bại!', variant: 'error' }));
  }
}

function* updateCommentRequest(action) {
  try {
    const { data } = yield call(updateComment, action.payload);
    yield put(updateCommentSuccess(data));
  } catch (error) {
    yield put(updateCommentFailure(error));
    yield put(showNotification({ message: 'Bình luận bài viết thất bại!', variant: 'error' }));
  }
}

function* deleteCommentRequest(action) {
  try {
    yield call(deleteComment, action.payload);
    yield put(deleteCommentSuccess(action.payload));
  } catch (error) {
    yield put(deleteCommentFailure(error));
    yield put(showNotification({ message: 'Xoá bình luận bài viết thất bại!', variant: 'error' }));
  }
}

function* PostSaga() {
  yield takeLatest(getPostsStart.type, getPostsRequest);
  yield takeLatest(getFavoritePostStart.type, getFavouritePostsRequest);
  yield takeLatest(getPostsByNoAdminStart.type, getPostsByNotAdminRequest);
  yield takeLatest(getPostStart.type, getPostRequest);
  yield takeLatest(createPostStart.type, createPostRequest);
  yield takeLatest(updatePostStart.type, updatePostRequest);
  yield takeLatest(asignTagToPostStart.type, asignTagToPostRequest);
  yield takeLatest(deletePostStart.type, deletePostRequest);
  yield takeLatest(likePostStart.type, likePostRequest);
  yield takeLatest(createCommentStart.type, createCommentRequest);
  yield takeLatest(updateCommentStart.type, updateCommentRequest);
  yield takeLatest(deleteCommentStart.type, deleteCommentRequest);
  yield takeLatest(unlikePostStart.type, unlikePostRequest);
}

export default PostSaga;
