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
import { getSelfStart } from '~/redux/auth/slice';

function* getSelfRequest() {
  try {
    const { data } = yield call(getSelf);
    yield put(getSuccess(data));
  } catch (error) {
    yield put(getFailure(error));
  }
}

function* createSelfRequest(action) {
  try {
    const { data } = yield call(createSelf, action.payload);
    yield put(createSuccess(data));
  } catch (error) {
    yield put(createFailure(error));
  }
}

function* updateSelfRequest(action) {
  try {
    const { data } = yield call(updateSelf, action.payload);
    yield put(updateSuccess(data));
  } catch (error) {
    yield put(updateFailure(error));
  }
}

function* updateAvatarSelfRequest(action) {
  try {
    const { data } = yield call(updateAvatar, action.payload);
    yield put(updateAvatarSuccess(data));
  } catch (error) {
    yield put(updateAvatarFailure(error));
  }
}

function* personalSaga() {
  yield takeLatest(getSelfStart.type, getSelfRequest);
  yield takeLatest(createStart.type, createSelfRequest);
  yield takeLatest(updateStart.type, updateSelfRequest);
  yield takeLatest(updateAvatarStart.type, updateAvatarSelfRequest);
}

export default personalSaga;
