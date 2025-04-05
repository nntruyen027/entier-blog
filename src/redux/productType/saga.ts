import { call, put, takeLatest } from 'redux-saga/effects';
import {
  createTypeFailure,
  createTypeStart,
  createTypeSuccess,
  deleteTypeFailure,
  deleteTypeStart,
  deleteTypeSuccess,
  getTypeFailure,
  getTypesFailure,
  getTypesStart,
  getTypesSuccess,
  getTypeStart,
  getTypeSuccess,
  updateTypeFailure,
  updateTypeStart,
  updateTypeSuccess
} from './slice';
import { createOne, deleteOne, getAll, getOne, updateOne } from './api';
import { showNotification } from '~/redux/noti/slice'; // Giả sử bạn có một slice quản lý thông báo

function* getAllRequest(action) {
  try {
    const { data } = yield call(getAll, action.payload);
    yield put(getTypesSuccess(data));
  } catch (error) {
    yield put(getTypesFailure(error));
    yield put(showNotification({ message: 'Lấy danh sách loại thất bại!', variant: 'error' }));
  }
}

function* getOneRequest(action) {
  try {
    const { data } = yield call(getOne, action.payload);
    yield put(getTypeSuccess(data));
  } catch (error) {
    yield put(getTypeFailure(error));
    yield put(showNotification({ message: 'Lấy loại thất bại!', variant: 'error' }));
  }
}

function* createOneRequest(action) {
  try {
    const { data } = yield call(createOne, action.payload);
    yield put(createTypeSuccess(data));
    yield put(showNotification({ message: 'Tạo loại thành công!', variant: 'success' }));
  } catch (error) {
    yield put(createTypeFailure(error));
    yield put(showNotification({ message: 'Tạo loại thất bại!', variant: 'error' }));
  }
}

function* updateOneRequest(action) {
  try {
    const { data } = yield call(updateOne, action.payload);
    yield put(updateTypeSuccess(data));
    yield put(showNotification({ message: 'Cập nhật loại thành công!', variant: 'success' }));
  } catch (error) {
    yield put(updateTypeFailure(error));
    yield put(showNotification({ message: 'Cập nhật loại thất bại!', variant: 'error' }));
  }
}

function* deleteOneRequest(action) {
  try {
    yield call(deleteOne, action.payload);
    yield put(deleteTypeSuccess(action.payload));
    yield put(showNotification({ message: 'Xóa loại thành công!', variant: 'success' }));
  } catch (error) {
    yield put(deleteTypeFailure(error));
    yield put(showNotification({ message: 'Xóa loại thất bại!', variant: 'error' }));
  }
}

function* typeSaga() {
  yield takeLatest(getTypesStart.type, getAllRequest);
  yield takeLatest(getTypeStart.type, getOneRequest);
  yield takeLatest(createTypeStart.type, createOneRequest);
  yield takeLatest(updateTypeStart.type, updateOneRequest);
  yield takeLatest(deleteTypeStart.type, deleteOneRequest);
}

export default typeSaga;
