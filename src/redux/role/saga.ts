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

function* getRolesRequest(action) {
  try {
    const { data } = yield call(getAll, action.payload);
    yield put(getRolesSuccess(data));
  } catch (error) {
    yield put(getRolesFailure(error));
  }
}

function* createRoleRequest(action) {
  try {
    const { data } = yield call(createOne, action.payload);
    yield put(createRoleSuccess(data));
  } catch (error) {
    yield put(createRoleFailure(error));
  }
}

function* updateRoleRequest(action) {
  try {
    const { data } = yield call(updateOne, action.payload);
    yield put(updateRoleSuccess(data));
  } catch (error) {
    yield put(updateRoleFailure(error));
  }
}

function* deleteRoleRequest(action) {
  try {
    yield call(deleteOne, action.payload);
    yield put(deleteRoleSuccess(action.payload));
  } catch (error) {
    yield put(deleteRoleFailure(error));
  }
}

function* RoleSaga() {
  yield takeLatest(getRolesStart.type, getRolesRequest);
  yield takeLatest(createRoleStart.type, createRoleRequest);
  yield takeLatest(updateRoleStart.type, updateRoleRequest);
  yield takeLatest(deleteRoleStart.type, deleteRoleRequest);
}

export default RoleSaga;
