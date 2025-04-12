import { assignRolesToUser, createUser, deleteOne, getAll, updateOne } from './api';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  assignRoleToUserFailure,
  assignRoleToUserStart,
  assignRoleToUserSuccess,
  createUserFailure,
  createUserStart,
  createUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  getUsersFailure,
  getUsersStart,
  getUsersSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess
} from '~/redux/user/slice';
import { showNotification } from '~/redux/noti/slice'; // Giả sử bạn có slice thông báo

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
    const { data } = yield call(createUser, action.payload);
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

function* assignRoleToUserRequest(action) {
  try {
    const { data } = yield call(assignRolesToUser, action.payload);
    yield put(assignRoleToUserSuccess(action.payload));
    yield put(showNotification({ message: 'Cập nhật quyền người dùng thành công!', variant: 'success' }));
  } catch (error) {
    yield put(assignRoleToUserFailure(error));
    yield put(showNotification({ message: 'Cập nhật quyền người dùng thất bại!', variant: 'error' }));
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

function* UserSaga() {
  yield takeLatest(getUsersStart.type, getUsersRequest);
  yield takeLatest(createUserStart.type, createUserRequest);
  yield takeLatest(updateUserStart.type, updateUserRequest);
  yield takeLatest(assignRoleToUserStart.type, assignRoleToUserRequest);
  yield takeLatest(deleteUserStart.type, deleteUserRequest);
}

export default UserSaga;
