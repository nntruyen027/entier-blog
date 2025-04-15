import { createOne, deleteOne, getAll, updateOne } from './api';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  createContactTypeFailure,
  createContactTypeStart,
  createContactTypeSuccess,
  deleteContactTypeFailure,
  deleteContactTypeStart,
  deleteContactTypeSuccess,
  getContactTypesFailure,
  getContactTypesStart,
  getContactTypesSuccess,
  updateContactTypeFailure,
  updateContactTypeStart,
  updateContactTypeSuccess
} from './slice';
import { showNotification } from '~/redux/noti/slice'; // Giả sử bạn có slice thông báo

function* getContactTypesRequest(action) {
  try {
    const { data } = yield call(getAll, action.payload);
    yield put(getContactTypesSuccess(data));
  } catch (error) {
    yield put(getContactTypesFailure(error));
    yield put(showNotification({ message: 'Lấy danh sách loại liên hệ thất bại!', variant: 'error' }));
  }
}

function* createContactTypeRequest(action) {
  try {
    const { data } = yield call(createOne, action.payload);
    yield put(createContactTypeSuccess(data));
    yield put(showNotification({ message: 'Tạo loại liên hệ thành công!', variant: 'success' }));
  } catch (error) {
    yield put(createContactTypeFailure(error));
    yield put(showNotification({ message: 'Tạo loại liên hệ thất bại!', variant: 'error' }));
  }
}

function* updateContactTypeRequest(action) {
  try {
    const { data } = yield call(updateOne, action.payload);
    yield put(updateContactTypeSuccess(data));
    yield put(showNotification({ message: 'Cập nhật loại liên hệ thành công!', variant: 'success' }));
  } catch (error) {
    yield put(updateContactTypeFailure(error));
    yield put(showNotification({ message: 'Cập nhật loại liên hệ thất bại!', variant: 'error' }));
  }
}

function* deleteContactTypeRequest(action) {
  try {
    yield call(deleteOne, action.payload);
    yield put(deleteContactTypeSuccess(action.payload));
    yield put(showNotification({ message: 'Xóa loại liên hệ thành công!', variant: 'success' }));
  } catch (error) {
    yield put(deleteContactTypeFailure(error));
    yield put(showNotification({ message: 'Xóa loại liên hệ thất bại!', variant: 'error' }));
  }
}

function* ContactTypeSaga() {
  yield takeLatest(getContactTypesStart.type, getContactTypesRequest);
  yield takeLatest(createContactTypeStart.type, createContactTypeRequest);
  yield takeLatest(updateContactTypeStart.type, updateContactTypeRequest);
  yield takeLatest(deleteContactTypeStart.type, deleteContactTypeRequest);
}

export default ContactTypeSaga;
