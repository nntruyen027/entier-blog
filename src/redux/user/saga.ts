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

function* getUsersRequest(action) {
  try {
    const { data } = yield call(getAll, action.payload);
    yield put(getUsersSuccess(data));
  } catch (error) {
    yield put(getUsersFailure(error));
  }
}

function* createUserRequest(action) {
  try {
    const { data } = yield call(createOne, action.payload);
    yield put(createUserSuccess(data));
  } catch (error) {
    yield put(createUserFailure(error));
  }
}

function* updateUserRequest(action) {
  try {
    const { data } = yield call(updateOne, action.payload);
    yield put(updateUserSuccess(data));
  } catch (error) {
    yield put(updateUserFailure(error));
  }
}

function* deleteUserRequest(action) {
  try {
    yield call(deleteOne, action.payload);
    yield put(deleteUserSuccess(action.payload));
  } catch (error) {
    yield put(deleteUserFailure(error));
  }
}

function* assignRolesRequest(action) {
  try {
    yield call(assignRolesToUser, action.payload);
    yield put(assignRolesSuccess(action.payload));
  } catch (error) {
    yield put(assignRolesFailure(error));
  }
}

function* resetPassRequest(action) {
  try {
    yield call(resetPassword, action.payload);
    yield put(resetPassSuccess(action.payload));
  } catch (error) {
    yield put(resetPassFailure(error));
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
