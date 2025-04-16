import { createOne, deleteOne, getAll, getOne, updateOne } from './api';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  createProductTypeFailure,
  createProductTypeStart,
  createProductTypeSuccess,
  deleteProductTypeFailure,
  deleteProductTypeStart,
  deleteProductTypeSuccess,
  getProductTypeFailure,
  getProductTypesFailure,
  getProductTypesStart,
  getProductTypesSuccess,
  getProductTypeStart,
  getProductTypeSuccess,
  updateProductTypeFailure,
  updateProductTypeStart,
  updateProductTypeSuccess
} from './slice';
import { showNotification } from '~/redux/noti/slice'; // Giả sử bạn có slice thông báo

function* getProductTypesRequest(action) {
  try {
    const { data } = yield call(getAll, action.payload);
    yield put(getProductTypesSuccess(data));
  } catch (error) {
    yield put(getProductTypesFailure(error));
    yield put(showNotification({ message: 'Lấy danh sách loại sản phẩm thất bại!', variant: 'error' }));
  }
}

function* getProductTypeRequest(action) {
  try {
    const { data } = yield call(getOne, action.payload);
    yield put(getProductTypeSuccess(data));
  } catch (error) {
    yield put(getProductTypeFailure(error));
    yield put(showNotification({ message: 'Lấy danh sách loại sản phẩm thất bại!', variant: 'error' }));
  }
}

function* createProductTypeRequest(action) {
  try {
    const { data } = yield call(createOne, action.payload);
    yield put(createProductTypeSuccess(data));
    yield put(showNotification({ message: 'Tạo loại sản phẩm thành công!', variant: 'success' }));
  } catch (error) {
    yield put(createProductTypeFailure(error));
    yield put(showNotification({ message: 'Tạo loại sản phẩm thất bại!', variant: 'error' }));
  }
}

function* updateProductTypeRequest(action) {
  try {
    const { data } = yield call(updateOne, action.payload);
    yield put(updateProductTypeSuccess(data));
    yield put(showNotification({ message: 'Cập nhật loại sản phẩm thành công!', variant: 'success' }));
  } catch (error) {
    yield put(updateProductTypeFailure(error));
    yield put(showNotification({ message: 'Cập nhật loại sản phẩm thất bại!', variant: 'error' }));
  }
}

function* deleteProductTypeRequest(action) {
  try {
    yield call(deleteOne, action.payload);
    yield put(deleteProductTypeSuccess(action.payload));
    yield put(showNotification({ message: 'Xóa loại sản phẩm thành công!', variant: 'success' }));
  } catch (error) {
    yield put(deleteProductTypeFailure(error));
    yield put(showNotification({ message: 'Xóa loại sản phẩm thất bại!', variant: 'error' }));
  }
}

function* ProductTypeSaga() {
  yield takeLatest(getProductTypesStart.type, getProductTypesRequest);
  yield takeLatest(getProductTypeStart.type, getProductTypeRequest);
  yield takeLatest(createProductTypeStart.type, createProductTypeRequest);
  yield takeLatest(updateProductTypeStart.type, updateProductTypeRequest);
  yield takeLatest(deleteProductTypeStart.type, deleteProductTypeRequest);
}

export default ProductTypeSaga;
