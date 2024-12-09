import { call, put, takeLatest } from 'redux-saga/effects';
import { getSelf, login } from './api';
import { getSelfFail, getSelfStart, getSelfSuccess, loginFail, loginStart, loginSuccess } from './slice';
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

function* authSaga() {
  yield takeLatest(loginStart.type, loginRequest);
  yield takeLatest(getSelfStart.type, getSelfRequest);
}

export default authSaga;
