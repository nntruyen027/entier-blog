import { createOne, deleteOne, getAll, updateOne } from './api';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  createContactFailure,
  createContactStart,
  createContactSuccess,
  deleteContactFailure,
  deleteContactStart,
  deleteContactSuccess,
  getContactsFailure,
  getContactsStart,
  getContactsSuccess,
  updateContactFailure,
  updateContactStart,
  updateContactSuccess
} from './slice';
import { showNotification } from '~/redux/noti/slice'; // Giả sử bạn có slice thông báo

function* getContactsRequest(action) {
  try {
    const { data } = yield call(getAll, action.payload);
    yield put(getContactsSuccess(data));
  } catch (error) {
    yield put(getContactsFailure(error));
    yield put(showNotification({ message: 'Lấy danh sách liên hệ thất bại!', variant: 'error' }));
  }
}

function* createContactRequest(action) {
  try {
    const { data } = yield call(createOne, action.payload);
    yield put(createContactSuccess(data));
    yield put(showNotification({ message: 'Tạo liên hệ thành công!', variant: 'success' }));
  } catch (error) {
    yield put(createContactFailure(error));
    yield put(showNotification({ message: 'Tạo liên hệ thất bại!', variant: 'error' }));
  }
}

function* updateContactRequest(action) {
  try {
    const { data } = yield call(updateOne, action.payload);
    yield put(updateContactSuccess(data));
    yield put(showNotification({ message: 'Cập nhật liên hệ thành công!', variant: 'success' }));
  } catch (error) {
    yield put(updateContactFailure(error));
    yield put(showNotification({ message: 'Cập nhật liên hệ thất bại!', variant: 'error' }));
  }
}

function* deleteContactRequest(action) {
  try {
    yield call(deleteOne, action.payload);
    yield put(deleteContactSuccess(action.payload));
    yield put(showNotification({ message: 'Xóa liên hệ thành công!', variant: 'success' }));
  } catch (error) {
    yield put(deleteContactFailure(error));
    yield put(showNotification({ message: 'Xóa liên hệ thất bại!', variant: 'error' }));
  }
}

function* ContactSaga() {
  yield takeLatest(getContactsStart.type, getContactsRequest);
  yield takeLatest(createContactStart.type, createContactRequest);
  yield takeLatest(updateContactStart.type, updateContactRequest);
  yield takeLatest(deleteContactStart.type, deleteContactRequest);
}

export default ContactSaga;
