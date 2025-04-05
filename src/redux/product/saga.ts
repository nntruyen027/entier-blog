import { call, put, takeLatest } from 'redux-saga/effects';
import {
  createProductFailure,
  createProductStart,
  createProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  getProductFailure,
  getProductsFailure,
  getProductsStart,
  getProductsSuccess,
  getProductStart,
  getProductSuccess,
  updateProductAttributeFailure,
  updateProductAttributeStart,
  updateProductAttributeSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductTagStart
} from './slice';
import { assignTags, createOne, deleteOne, getAll, getOne, updateAttribute, updateOne } from './api';
import { showNotification } from '~/redux/noti/slice'; // Giả sử bạn có một slice quản lý thông báo

function* getAllRequest(action) {
  try {
    const { data } = yield call(getAll, action.payload);
    yield put(getProductsSuccess(data));
  } catch (error) {
    yield put(getProductsFailure(error));
    yield put(showNotification({ message: 'Lấy sản phẩm thất bại!', variant: 'error' }));
  }
}

function* getOneRequest(action) {
  try {
    const { data } = yield call(getOne, action.payload);
    yield put(getProductSuccess(data));
  } catch (error) {
    yield put(getProductFailure(error));
    yield put(showNotification({ message: 'Lấy sản phẩm thất bại!', variant: 'error' }));
  }
}

function* createOneRequest(action) {
  try {
    const { data } = yield call(createOne, action.payload);
    yield put(createProductSuccess(data));
    yield put(showNotification({ message: 'Tạo sản phẩm thành công!', variant: 'success' }));
  } catch (error) {
    yield put(createProductFailure(error));
    yield put(showNotification({ message: 'Tạo sản phẩm thất bại!', variant: 'error' }));
  }
}

function* updateOneRequest(action) {
  try {
    const { data } = yield call(updateOne, action.payload);
    yield put(updateProductSuccess(data));
    yield put(showNotification({ message: 'Cập nhật sản phẩm thành công!', variant: 'success' }));
  } catch (error) {
    yield put(updateProductFailure(error));
    yield put(showNotification({ message: 'Cập nhật sản phẩm thất bại!', variant: 'error' }));
  }
}

function* updateAttributeRequest(action) {
  try {
    const { data } = yield call(updateAttribute, action.payload);
    yield put(updateProductAttributeSuccess(data));
    yield put(showNotification({ message: 'Cập nhật thuộc tính sản phẩm thành công!', variant: 'success' }));
  } catch (error) {
    yield put(updateProductAttributeFailure(error));
    yield put(showNotification({ message: 'Cập nhật thuộc tính sản phẩm thất bại!', variant: 'error' }));
  }
}

function* asigntTagsRequest(action) {
  try {
    const { data } = yield call(assignTags, action.payload);
    yield put(updateProductSuccess(data));
    yield put(showNotification({ message: 'Cập nhật thẻ sản phẩm thành công!', variant: 'success' }));
  } catch (error) {
    yield put(updateProductFailure(error));
    yield put(showNotification({ message: 'Cập nhật thẻ sản phẩm thất bại!', variant: 'error' }));
  }
}

function* deleteOneRequest(action) {
  try {
    yield call(deleteOne, action.payload);
    yield put(deleteProductSuccess(action.payload));
    yield put(showNotification({ message: 'Xóa sản phẩm thành công!', variant: 'success' }));
  } catch (error) {
    yield put(deleteProductFailure(error));
    yield put(showNotification({ message: 'Xóa sản phẩm thất bại!', variant: 'error' }));
  }
}

function* productSaga() {
  yield takeLatest(getProductsStart.type, getAllRequest);
  yield takeLatest(getProductStart.type, getOneRequest);
  yield takeLatest(createProductStart.type, createOneRequest);
  yield takeLatest(updateProductStart.type, updateOneRequest);
  yield takeLatest(updateProductTagStart.type, asigntTagsRequest);
  yield takeLatest(deleteProductStart.type, deleteOneRequest);
  yield takeLatest(updateProductAttributeStart.type, updateAttributeRequest);
}

export default productSaga;
