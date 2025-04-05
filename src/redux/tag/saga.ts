import { call, put, takeLatest } from 'redux-saga/effects';
import {
  createTagFailure,
  createTagStart,
  createTagSuccess,
  deleteTagFailure,
  deleteTagStart,
  deleteTagSuccess,
  getTagFailure,
  getTagsFailure,
  getTagsStart,
  getTagsSuccess,
  getTagStart,
  getTagSuccess,
  updateTagFailure,
  updateTagStart,
  updateTagSuccess
} from './slice';
import { createOne, deleteOne, getAll, getOne, updateOne } from './api';
import { showNotification } from '~/redux/noti/slice'; // Thêm thông báo

function* getAllRequest(action) {
  try {
    const { data } = yield call(getAll, action.payload);
    yield put(getTagsSuccess(data));
  } catch (error) {
    yield put(getTagsFailure(error));
    yield put(showNotification({ message: 'Lấy danh sách tag thất bại!', variant: 'error' }));
  }
}

function* getOneRequest(action) {
  try {
    const { data } = yield call(getOne, action.payload);
    yield put(getTagSuccess(data));
  } catch (error) {
    yield put(getTagFailure(error));
    yield put(showNotification({ message: 'Lấy tag thất bại!', variant: 'error' }));
  }
}

function* createOneRequest(action) {
  try {
    const { data } = yield call(createOne, action.payload);
    yield put(createTagSuccess(data));
    yield put(showNotification({ message: 'Tạo tag thành công!', variant: 'success' }));
  } catch (error) {
    yield put(createTagFailure(error));
    yield put(showNotification({ message: 'Tạo tag thất bại!', variant: 'error' }));
  }
}

function* updateOneRequest(action) {
  try {
    const { data } = yield call(updateOne, action.payload);
    yield put(updateTagSuccess(data));
    yield put(showNotification({ message: 'Cập nhật tag thành công!', variant: 'success' }));
  } catch (error) {
    yield put(updateTagFailure(error));
    yield put(showNotification({ message: 'Cập nhật tag thất bại!', variant: 'error' }));
  }
}

function* deleteOneRequest(action) {
  try {
    yield call(deleteOne, action.payload);
    yield put(deleteTagSuccess(action.payload));
    yield put(showNotification({ message: 'Xóa tag thành công!', variant: 'success' }));
  } catch (error) {
    yield put(deleteTagFailure(error));
    yield put(showNotification({ message: 'Xóa tag thất bại!', variant: 'error' }));
  }
}

function* typeSaga() {
  yield takeLatest(getTagsStart.type, getAllRequest);
  yield takeLatest(getTagStart.type, getOneRequest);
  yield takeLatest(createTagStart.type, createOneRequest);
  yield takeLatest(updateTagStart.type, updateOneRequest);
  yield takeLatest(deleteTagStart.type, deleteOneRequest);
}

export default typeSaga;
