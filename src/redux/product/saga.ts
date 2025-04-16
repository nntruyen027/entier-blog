import { createOne, deleteOne, getAll, getAllByAdmin, getOne, updateOne } from './api';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  createProductFailure,
  createProductStart,
  createProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  getProductFailure,
  getProductsByAdminStart,
  getProductsFailure,
  getProductsStart,
  getProductsSuccess,
  getProductStart,
  getProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess
} from './slice';
import { showNotification } from '~/redux/noti/slice'; // Giả sử bạn có slice thông báo

function* getProductsRequest(action) {
  try {
    const { data } = yield call(getAll, action.payload);
    yield put(getProductsSuccess(data));
  } catch (error) {
    yield put(getProductsFailure(error));
    yield put(showNotification({ message: 'Lấy danh sách sản phẩm thất bại!', variant: 'error' }));
  }
}

function* getProductsByAdminRequest(action) {
  try {
    const { data } = yield call(getAllByAdmin, action.payload);
    yield put(getProductsSuccess(data));
  } catch (error) {
    yield put(getProductsFailure(error));
    yield put(showNotification({ message: 'Lấy danh sách sản phẩm thất bại!', variant: 'error' }));
  }
}

function* getProductRequest(action) {
  try {
    const { data } = yield call(getOne, action.payload);
    yield put(getProductSuccess(data));
  } catch (error) {
    yield put(getProductFailure(error));
    yield put(showNotification({ message: 'Lấy danh sách sản phẩm thất bại!', variant: 'error' }));
  }
}

function* createProductRequest(action) {
  try {
    const { data } = yield call(createOne, action.payload);
    yield put(createProductSuccess(data));
    yield put(showNotification({ message: 'Tạo sản phẩm thành công!', variant: 'success' }));
  } catch (error) {
    yield put(createProductFailure(error));
    yield put(showNotification({ message: 'Tạo sản phẩm thất bại!', variant: 'error' }));
  }
}

function* updateProductRequest(action) {
  try {
    const { data } = yield call(updateOne, action.payload);
    yield put(updateProductSuccess(data));
    yield put(showNotification({ message: 'Cập nhật sản phẩm thành công!', variant: 'success' }));
  } catch (error) {
    yield put(updateProductFailure(error));
    yield put(showNotification({ message: 'Cập nhật sản phẩm thất bại!', variant: 'error' }));
  }
}

function* deleteProductRequest(action) {
  try {
    yield call(deleteOne, action.payload);
    yield put(deleteProductSuccess(action.payload));
    yield put(showNotification({ message: 'Xóa sản phẩm thành công!', variant: 'success' }));
  } catch (error) {
    yield put(deleteProductFailure(error));
    yield put(showNotification({ message: 'Xóa sản phẩm thất bại!', variant: 'error' }));
  }
}

function* ProductSaga() {
  yield takeLatest(getProductsStart.type, getProductsRequest);
  yield takeLatest(getProductStart.type, getProductRequest);
  yield takeLatest(getProductsByAdminStart.type, getProductsByAdminRequest);
  yield takeLatest(createProductStart.type, createProductRequest);
  yield takeLatest(updateProductStart.type, updateProductRequest);
  yield takeLatest(deleteProductStart.type, deleteProductRequest);
}

export default ProductSaga;
