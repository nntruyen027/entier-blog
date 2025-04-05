import { call, put, takeLatest } from 'redux-saga/effects';
import {
  createAttributeFailure,
  createAttributeStart,
  createAttributeSuccess,
  deleteAttributeFailure,
  deleteAttributeStart,
  deleteAttributeSuccess,
  getAttributeFailure,
  getAttributesFailure,
  getAttributesStart,
  getAttributesSuccess,
  getAttributeStart,
  getAttributeSuccess,
  updateAttributeFailure,
  updateAttributeStart,
  updateAttributeSuccess
} from './slice';
import { createOne, deleteOne, getAll, getOne, updateOne } from './api';
import { showNotification } from '~/redux/noti/slice'; //

function* getAllRequest(action) {
  try {
    const { data } = yield call(getAll, action.payload);
    yield put(getAttributesSuccess(data));
  } catch (error) {
    yield put(getAttributesFailure(error));
  }
}

function* getOneRequest(action) {
  try {
    const { data } = yield call(getOne, action.payload);
    yield put(getAttributeSuccess(data));
  } catch (error) {
    yield put(getAttributeFailure(error));
  }
}

function* createOneRequest(action) {
  try {
    const { data } = yield call(createOne, action.payload);
    yield put(createAttributeSuccess(data));
    yield put(showNotification({ message: 'Tạo mới thành công!', variant: 'success' }));
  } catch (error) {
    yield put(createAttributeFailure(error));
    yield put(showNotification({ message: 'Tạo mới thất bại!', variant: 'error' }));
  }
}

function* updateOneRequest(action) {
  try {
    const { data } = yield call(updateOne, action.payload);
    yield put(updateAttributeSuccess(data));
    yield put(showNotification({ message: 'Cập nhật thành công!', variant: 'success' }));
  } catch (error) {
    yield put(updateAttributeFailure(error));
    yield put(showNotification({ message: 'Cập nhật thất bại!', variant: 'error' }));
  }
}

function* deleteOneRequest(action) {
  try {
    yield call(deleteOne, action.payload);
    yield put(deleteAttributeSuccess(action.payload));
    yield put(showNotification({ message: 'Xoá thành công!', variant: 'success' }));
  } catch (error) {
    yield put(deleteAttributeFailure(error));
    yield put(showNotification({ message: 'Xoá thất bại!', variant: 'error' }));
  }
}

function* attributeSaga() {
  yield takeLatest(getAttributesStart.type, getAllRequest);
  yield takeLatest(getAttributeStart.type, getOneRequest);
  yield takeLatest(createAttributeStart.type, createOneRequest);
  yield takeLatest(updateAttributeStart.type, updateOneRequest);
  yield takeLatest(deleteAttributeStart.type, deleteOneRequest);
}

export default attributeSaga;
