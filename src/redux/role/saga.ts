import { createOne, deleteOne, getAll, updateOne } from './api';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  createRoleFailure,
  createRoleStart,
  createRoleSuccess,
  deleteRoleFailure,
  deleteRoleStart,
  deleteRoleSuccess,
  getRolesFailure,
  getRolesStart,
  getRolesSuccess,
  updateRoleFailure,
  updateRoleStart,
  updateRoleSuccess
} from '~/redux/role/slice';
import { showNotification } from '~/redux/noti/slice'; // Giả sử bạn có slice thông báo

function* getRolesRequest(action) {
  try {
    const { data } = yield call(getAll, action.payload);
    yield put(getRolesSuccess(data));
  } catch (error) {
    yield put(getRolesFailure(error));
    yield put(showNotification({ message: 'Lấy danh sách vai trò thất bại!', variant: 'error' }));
  }
}

function* createRoleRequest(action) {
  try {
    const { data } = yield call(createOne, action.payload);
    yield put(createRoleSuccess(data));
    yield put(showNotification({ message: 'Tạo vai trò thành công!', variant: 'success' }));
  } catch (error) {
    yield put(createRoleFailure(error));
    yield put(showNotification({ message: 'Tạo vai trò thất bại!', variant: 'error' }));
  }
}

function* updateRoleRequest(action) {
  try {
    const { data } = yield call(updateOne, action.payload);
    yield put(updateRoleSuccess(data));
    yield put(showNotification({ message: 'Cập nhật vai trò thành công!', variant: 'success' }));
  } catch (error) {
    yield put(updateRoleFailure(error));
    yield put(showNotification({ message: 'Cập nhật vai trò thất bại!', variant: 'error' }));
  }
}

function* deleteRoleRequest(action) {
  try {
    yield call(deleteOne, action.payload);
    yield put(deleteRoleSuccess(action.payload));
    yield put(showNotification({ message: 'Xóa vai trò thành công!', variant: 'success' }));
  } catch (error) {
    yield put(deleteRoleFailure(error));
    yield put(showNotification({ message: 'Xóa vai trò thất bại!', variant: 'error' }));
  }
}

function* RoleSaga() {
  yield takeLatest(getRolesStart.type, getRolesRequest);
  yield takeLatest(createRoleStart.type, createRoleRequest);
  yield takeLatest(updateRoleStart.type, updateRoleRequest);
  yield takeLatest(deleteRoleStart.type, deleteRoleRequest);
}

export default RoleSaga;
