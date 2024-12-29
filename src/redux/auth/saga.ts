import { call, put, takeLatest } from 'redux-saga/effects';
import { getSelf, login, updatePassword } from './api';
import {
  getSelfFail,
  getSelfStart,
  getSelfSuccess,
  loginFail,
  loginStart,
  loginSuccess,
  updatePassSelfFail,
  updatePassSelfStart,
  updatePassSelfSuccess
} from './slice';
import { PayloadAction } from '@reduxjs/toolkit';

interface loginForm {
  username: string;
  password: string;
}

function* loginRequest(action: PayloadAction<loginForm>) {
  try {
    const data = yield call(login, action.payload);
    localStorage.setItem('token', data.data.token);
    yield put(loginSuccess(data.data.token));
  } catch (error) {
    yield put(loginFail(error));
  }
}

function* getSelfRequest() {
  try {
    const { data } = yield call(getSelf);
    yield put(getSelfSuccess(data));
  } catch (error) {
    yield put(getSelfFail(error));
  }
}

function* updatePassSelfRequest(action: PayloadAction<object>) {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    yield call(updatePassword, action.payload);
    yield put(updatePassSelfSuccess());
  } catch (error) {
    yield put(updatePassSelfFail(error));
  }
}

function* authSaga() {
  yield takeLatest(loginStart.type, loginRequest);
  yield takeLatest(getSelfStart.type, getSelfRequest);
  yield takeLatest(updatePassSelfStart.type, updatePassSelfRequest);
}

export default authSaga;
