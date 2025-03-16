import { call, put, takeLatest } from 'redux-saga/effects';
import {
  createProductVersionFailure,
  createProductVersionStart,
  createProductVersionSuccess,
  deleteProductVersionFailure,
  deleteProductVersionStart,
  deleteProductVersionSuccess,
  getProductVersionFailure,
  getProductVersionsFailure,
  getProductVersionsStart,
  getProductVersionsSuccess,
  getProductVersionStart,
  getProductVersionSuccess,
  updateProductVersionFailure,
  updateProductVersionStart,
  updateProductVersionSuccess
} from './slice';
import { createOne, deleteOne, getAll, getOne, updateOne } from './api';

function* getAllRequest(action) {
  try {
    const { data } = yield call(getAll, action.payload);
    yield put(getProductVersionsSuccess(data));
  } catch (error) {
    yield put(getProductVersionsFailure(error));
  }
}

function* getOneRequest(action) {
  try {
    const { data } = yield call(getOne, action.payload);
    yield put(getProductVersionSuccess(data));
  } catch (error) {
    yield put(getProductVersionFailure(error));
  }
}

function* createOneRequest(action) {
  try {
    const { data } = yield call(createOne, action.payload);
    yield put(createProductVersionSuccess(data));
  } catch (error) {
    yield put(createProductVersionFailure(error));
  }
}

function* updateOneRequest(action) {
  try {
    const { data } = yield call(updateOne, action.payload);
    yield put(updateProductVersionSuccess(data));
  } catch (error) {
    yield put(updateProductVersionFailure(error));
  }
}

function* deleteOneRequest(action) {
  try {
    yield call(deleteOne, action.payload);
    yield put(deleteProductVersionSuccess(action.payload));
  } catch (error) {
    yield put(deleteProductVersionFailure(error));
  }
}

function* productVersionSaga() {
  yield takeLatest(getProductVersionsStart.type, getAllRequest);
  yield takeLatest(getProductVersionStart.type, getOneRequest);
  yield takeLatest(createProductVersionStart.type, createOneRequest);
  yield takeLatest(updateProductVersionStart.type, updateOneRequest);
  yield takeLatest(deleteProductVersionStart.type, deleteOneRequest);
}

export default productVersionSaga;
