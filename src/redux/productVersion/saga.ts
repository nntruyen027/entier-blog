import { call, put, takeLatest } from 'redux-saga/effects';
import {
  createProductVersionFailure,
  createProductVersionStart,
  createProductVersionSuccess,
  deleteProductVersionFailure,
  deleteProductVersionStart,
  deleteProductVersionSuccess,
  getProductVersionFailure,
  getProductVersionsFailure,
  getProductVersionsStart,
  getProductVersionsSuccess,
  getProductVersionStart,
  getProductVersionSuccess,
  updateProductVersionFailure,
  updateProductVersionStart,
  updateProductVersionSuccess
} from './slice';
import { createOne, deleteOne, getAll, getOne, updateOne } from './api';
import { showNotification } from '~/redux/noti/slice'; // Giả sử bạn có một slice quản lý thông báo

function* getAllRequest(action) {
  try {
    const { data } = yield call(getAll, action.payload);
    yield put(getProductVersionsSuccess(data));
  } catch (error) {
    yield put(getProductVersionsFailure(error));
    yield put(showNotification({ message: 'Lấy danh sách phiên bản sản phẩm thất bại!', variant: 'error' }));
  }
}

function* getOneRequest(action) {
  try {
    const { data } = yield call(getOne, action.payload);
    yield put(getProductVersionSuccess(data));
  } catch (error) {
    yield put(getProductVersionFailure(error));
    yield put(showNotification({ message: 'Lấy phiên bản sản phẩm thất bại!', variant: 'error' }));
  }
}

function* createOneRequest(action) {
  try {
    const { data } = yield call(createOne, action.payload);
    yield put(createProductVersionSuccess(data));
    yield put(showNotification({ message: 'Tạo phiên bản sản phẩm thành công!', variant: 'success' }));
  } catch (error) {
    yield put(createProductVersionFailure(error));
    yield put(showNotification({ message: 'Tạo phiên bản sản phẩm thất bại!', variant: 'error' }));
  }
}

function* updateOneRequest(action) {
  try {
    const { data } = yield call(updateOne, action.payload);
    yield put(updateProductVersionSuccess(data));
    yield put(showNotification({ message: 'Cập nhật phiên bản sản phẩm thành công!', variant: 'success' }));
  } catch (error) {
    yield put(updateProductVersionFailure(error));
    yield put(showNotification({ message: 'Cập nhật phiên bản sản phẩm thất bại!', variant: 'error' }));
  }
}

function* deleteOneRequest(action) {
  try {
    yield call(deleteOne, action.payload);
    yield put(deleteProductVersionSuccess(action.payload));
    yield put(showNotification({ message: 'Xóa phiên bản sản phẩm thành công!', variant: 'success' }));
  } catch (error) {
    yield put(deleteProductVersionFailure(error));
    yield put(showNotification({ message: 'Xóa phiên bản sản phẩm thất bại!', variant: 'error' }));
  }
}

function* productVersionSaga() {
  yield takeLatest(getProductVersionsStart.type, getAllRequest);
  yield takeLatest(getProductVersionStart.type, getOneRequest);
  yield takeLatest(createProductVersionStart.type, createOneRequest);
  yield takeLatest(updateProductVersionStart.type, updateOneRequest);
  yield takeLatest(deleteProductVersionStart.type, deleteOneRequest);
}

export default productVersionSaga;
