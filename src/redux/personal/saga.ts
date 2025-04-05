import { createSelf, getSelf, updateAvatar, updateSelf } from './api';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  createFailure,
  createStart,
  createSuccess,
  getFailure,
  getSuccess,
  updateAvatarFailure,
  updateAvatarStart,
  updateAvatarSuccess,
  updateFailure,
  updateStart,
  updateSuccess
} from './slice';
import { showNotification } from '~/redux/noti/slice'; // Import showNotification
import { getSelfStart } from '~/redux/auth/slice';

// GET Request - Không thông báo thành công, chỉ thông báo lỗi nếu có
function* getSelfRequest() {
  try {
    const { data } = yield call(getSelf);
    yield put(getSuccess(data));
  } catch (error) {
    yield put(getFailure(error));
    yield put(showNotification({ message: 'Lấy thông tin cá nhân thất bại!', variant: 'error' }));
  }
}

// CREATE Request - Thông báo cả thành công và thất bại
function* createSelfRequest(action) {
  try {
    const { data } = yield call(createSelf, action.payload);
    yield put(createSuccess(data));
    yield put(showNotification({ message: 'Tạo thông tin cá nhân thành công!', variant: 'success' }));
  } catch (error) {
    yield put(createFailure(error));
    yield put(showNotification({ message: 'Tạo thông tin cá nhân thất bại!', variant: 'error' }));
  }
}

// UPDATE Request - Thông báo cả thành công và thất bại
function* updateSelfRequest(action) {
  try {
    const { data } = yield call(updateSelf, action.payload);
    yield put(updateSuccess(data));
    yield put(showNotification({ message: 'Cập nhật thông tin cá nhân thành công!', variant: 'success' }));
  } catch (error) {
    yield put(updateFailure(error));
    yield put(showNotification({ message: 'Cập nhật thông tin cá nhân thất bại!', variant: 'error' }));
  }
}

// UPDATE Avatar Request - Thông báo cả thành công và thất bại
function* updateAvatarSelfRequest(action) {
  try {
    const { data } = yield call(updateAvatar, action.payload);
    yield put(updateAvatarSuccess(data));
    yield put(showNotification({ message: 'Cập nhật avatar thành công!', variant: 'success' }));
  } catch (error) {
    yield put(updateAvatarFailure(error));
    yield put(showNotification({ message: 'Cập nhật avatar thất bại!', variant: 'error' }));
  }
}

function* personalSaga() {
  yield takeLatest(getSelfStart.type, getSelfRequest);
  yield takeLatest(createStart.type, createSelfRequest);
  yield takeLatest(updateStart.type, updateSelfRequest);
  yield takeLatest(updateAvatarStart.type, updateAvatarSelfRequest);
}

export default personalSaga;
