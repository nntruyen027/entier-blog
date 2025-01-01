import { createOne, deleteOne, getAll, updateOne } from './api';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
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

function* UserSaga() {
  yield takeLatest(getUsersStart.type, getUsersRequest);
  yield takeLatest(createUserStart.type, createUserRequest);
  yield takeLatest(updateUserStart.type, updateUserRequest);
  yield takeLatest(deleteUserStart.type, deleteUserRequest);
}

export default UserSaga;
