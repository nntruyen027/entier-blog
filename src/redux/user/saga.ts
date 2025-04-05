import { assignRolesToUser, createOne, deleteOne, getAll, resetPassword, updateOne } from './api';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  assignRolesFailure,
  assignRolesStart,
  assignRolesSuccess,
  createUserFailure,
  createUserStart,
  createUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  getUsersFailure,
  getUsersStart,
  getUsersSuccess,
  resetPassFailure,
  resetPassStart,
  resetPassSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess
} from './slice';
import { showNotification } from '~/redux/noti/slice'; // Giả sử bạn đã có slice thông báo

function* getUsersRequest(action) {
  try {
    const { data } = yield call(getAll, action.payload);
    yield put(getUsersSuccess(data));
  } catch (error) {
    yield put(getUsersFailure(error));
    yield put(showNotification({ message: 'Lấy danh sách người dùng thất bại!', variant: 'error' }));
  }
}

function* createUserRequest(action) {
  try {
    const { data } = yield call(createOne, action.payload);
    yield put(createUserSuccess(data));
    yield put(showNotification({ message: 'Tạo người dùng thành công!', variant: 'success' }));
  } catch (error) {
    yield put(createUserFailure(error));
    yield put(showNotification({ message: 'Tạo người dùng thất bại!', variant: 'error' }));
  }
}

function* updateUserRequest(action) {
  try {
    const { data } = yield call(updateOne, action.payload);
    yield put(updateUserSuccess(data));
    yield put(showNotification({ message: 'Cập nhật người dùng thành công!', variant: 'success' }));
  } catch (error) {
    yield put(updateUserFailure(error));
    yield put(showNotification({ message: 'Cập nhật người dùng thất bại!', variant: 'error' }));
  }
}

function* deleteUserRequest(action) {
  try {
    yield call(deleteOne, action.payload);
    yield put(deleteUserSuccess(action.payload));
    yield put(showNotification({ message: 'Xóa người dùng thành công!', variant: 'success' }));
  } catch (error) {
    yield put(deleteUserFailure(error));
    yield put(showNotification({ message: 'Xóa người dùng thất bại!', variant: 'error' }));
  }
}

function* assignRolesRequest(action) {
  try {
    yield call(assignRolesToUser, action.payload);
    yield put(assignRolesSuccess(action.payload));
    yield put(showNotification({ message: 'Gán quyền thành công!', variant: 'success' }));
  } catch (error) {
    yield put(assignRolesFailure(error));
    yield put(showNotification({ message: 'Gán quyền thất bại!', variant: 'error' }));
  }
}

function* resetPassRequest(action) {
  try {
    yield call(resetPassword, action.payload);
    yield put(resetPassSuccess(action.payload));
    yield put(showNotification({ message: 'Đặt lại mật khẩu thành công!', variant: 'success' }));
  } catch (error) {
    yield put(resetPassFailure(error));
    yield put(showNotification({ message: 'Đặt lại mật khẩu thất bại!', variant: 'error' }));
  }
}

function* UserSaga() {
  yield takeLatest(getUsersStart.type, getUsersRequest);
  yield takeLatest(createUserStart.type, createUserRequest);
  yield takeLatest(updateUserStart.type, updateUserRequest);
  yield takeLatest(deleteUserStart.type, deleteUserRequest);
  yield takeLatest(assignRolesStart.type, assignRolesRequest);
  yield takeLatest(resetPassStart.type, resetPassRequest);
}

export default UserSaga;
