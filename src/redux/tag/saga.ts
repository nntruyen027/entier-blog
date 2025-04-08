import { createOne, deleteOne, getAll, updateOne } from './api';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  createTagFailure,
  createTagStart,
  createTagSuccess,
  deleteTagFailure,
  deleteTagStart,
  deleteTagSuccess,
  getTagsFailure,
  getTagsStart,
  getTagsSuccess,
  updateTagFailure,
  updateTagStart,
  updateTagSuccess
} from '~/redux/tag/slice';
import { showNotification } from '~/redux/noti/slice'; // Giả sử bạn có slice thông báo

function* getTagsRequest(action) {
  try {
    const { data } = yield call(getAll, action.payload);
    yield put(getTagsSuccess(data));
  } catch (error) {
    yield put(getTagsFailure(error));
    yield put(showNotification({ message: 'Lấy danh sách thẻ thất bại!', variant: 'error' }));
  }
}

function* createTagRequest(action) {
  try {
    const { data } = yield call(createOne, action.payload);
    yield put(createTagSuccess(data));
    yield put(showNotification({ message: 'Tạo thẻ thành công!', variant: 'success' }));
  } catch (error) {
    yield put(createTagFailure(error));
    yield put(showNotification({ message: 'Tạo thẻ thất bại!', variant: 'error' }));
  }
}

function* updateTagRequest(action) {
  try {
    const { data } = yield call(updateOne, action.payload);
    yield put(updateTagSuccess(data));
    yield put(showNotification({ message: 'Cập nhật thẻ thành công!', variant: 'success' }));
  } catch (error) {
    yield put(updateTagFailure(error));
    yield put(showNotification({ message: 'Cập nhật thẻ thất bại!', variant: 'error' }));
  }
}

function* deleteTagRequest(action) {
  try {
    yield call(deleteOne, action.payload);
    yield put(deleteTagSuccess(action.payload));
    yield put(showNotification({ message: 'Xóa thẻ thành công!', variant: 'success' }));
  } catch (error) {
    yield put(deleteTagFailure(error));
    yield put(showNotification({ message: 'Xóa thẻ thất bại!', variant: 'error' }));
  }
}

function* TagSaga() {
  yield takeLatest(getTagsStart.type, getTagsRequest);
  yield takeLatest(createTagStart.type, createTagRequest);
  yield takeLatest(updateTagStart.type, updateTagRequest);
  yield takeLatest(deleteTagStart.type, deleteTagRequest);
}

export default TagSaga;
