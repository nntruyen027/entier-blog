import { createOne, deleteOne, getAll, updateOne } from './api';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  createParamFailure,
  createParamStart,
  createParamSuccess,
  deleteParamFailure,
  deleteParamStart,
  deleteParamSuccess,
  getParamsFailure,
  getParamsStart,
  getParamsSuccess,
  updateParamFailure,
  updateParamStart,
  updateParamSuccess
} from '~/redux/param/slice';
import { showNotification } from '~/redux/noti/slice'; // Giả sử bạn có slice thông báo

function* getParamsRequest(action) {
  try {
    const { data } = yield call(getAll, action.payload);
    yield put(getParamsSuccess(data));
  } catch (error) {
    yield put(getParamsFailure(error));
    yield put(showNotification({ message: 'Lấy danh sách tham số thất bại!', variant: 'error' }));
  }
}

function* createParamRequest(action) {
  try {
    const { data } = yield call(createOne, action.payload);
    yield put(createParamSuccess(data));
    yield put(showNotification({ message: 'Tạo tham số thành công!', variant: 'success' }));
  } catch (error) {
    yield put(createParamFailure(error));
    yield put(showNotification({ message: 'Tạo tham số thất bại!', variant: 'error' }));
  }
}

function* updateParamRequest(action) {
  try {
    const { data } = yield call(updateOne, action.payload);
    yield put(updateParamSuccess(data));
    yield put(showNotification({ message: 'Cập nhật tham số thành công!', variant: 'success' }));
  } catch (error) {
    yield put(updateParamFailure(error));
    yield put(showNotification({ message: 'Cập nhật tham số thất bại!', variant: 'error' }));
  }
}

function* deleteParamRequest(action) {
  try {
    yield call(deleteOne, action.payload);
    yield put(deleteParamSuccess(action.payload));
    yield put(showNotification({ message: 'Xóa tham số thành công!', variant: 'success' }));
  } catch (error) {
    yield put(deleteParamFailure(error));
    yield put(showNotification({ message: 'Xóa tham số thất bại!', variant: 'error' }));
  }
}

function* ParamSaga() {
  yield takeLatest(getParamsStart.type, getParamsRequest);
  yield takeLatest(createParamStart.type, createParamRequest);
  yield takeLatest(updateParamStart.type, updateParamRequest);
  yield takeLatest(deleteParamStart.type, deleteParamRequest);
}

export default ParamSaga;
