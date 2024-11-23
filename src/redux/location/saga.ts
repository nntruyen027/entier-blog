import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getDistrictsStart,
  getDistrictsSuccess,
  getError,
  getProvincesStart,
  getProvincesSuccess,
  getWardsStart,
  getWardsSuccess
} from './slice';
import { getDistricts, getProvinces, getWards } from './api';
import { PayloadAction } from '@reduxjs/toolkit';

function* getProvincesSaga() {
  try {
    const data = yield call(getProvinces);
    yield put(getProvincesSuccess(data?.data));
  } catch (error) {
    yield put(getError(error.message));
  }
}

function* getDistrictsSaga(action: PayloadAction<string>) {
  try {
    const data = yield call(getDistricts, action.payload);
    yield put(getDistrictsSuccess(data?.data));
  } catch (error) {
    yield put(getError(error.message));
  }
}

function* getWardsSaga(action: PayloadAction<string>) {
  try {
    const data = yield call(getWards, action.payload);
    yield put(getWardsSuccess(data?.data));
  } catch (error) {
    yield put(getError(error.message));
  }
}

function* locationSaga() {
  yield takeLatest(getProvincesStart.type, getProvincesSaga);
  yield takeLatest(getDistrictsStart.type, getDistrictsSaga);
  yield takeLatest(getWardsStart.type, getWardsSaga);
}

export default locationSaga;
