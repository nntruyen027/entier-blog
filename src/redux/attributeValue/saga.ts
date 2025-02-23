import { call, put, takeLatest } from 'redux-saga/effects';
import {
  createAttributeValueFailure,
  createAttributeValueStart,
  createAttributeValueSuccess,
  deleteAttributeValueFailure,
  deleteAttributeValueStart,
  deleteAttributeValueSuccess,
  getAttributeValueFailure,
  getAttributeValuesFailure,
  getAttributeValuesStart,
  getAttributeValuesSuccess,
  getAttributeValueStart,
  getAttributeValueSuccess,
  updateAttributeValueFailure,
  updateAttributeValueStart,
  updateAttributeValueSuccess
} from './slice';
import { createOne, deleteOne, getAll, getOne, updateOne } from './api';

function* getAllRequest(action) {
  try {
    const { data } = yield call(getAll, action.payload);
    yield put(getAttributeValuesSuccess(data));
  } catch (error) {
    yield put(getAttributeValuesFailure(error));
  }
}

function* getOneRequest(action) {
  try {
    const { data } = yield call(getOne, action.payload);
    yield put(getAttributeValueSuccess(data));
  } catch (error) {
    yield put(getAttributeValueFailure(error));
  }
}

function* createOneRequest(action) {
  try {
    const { data } = yield call(createOne, action.payload);
    yield put(createAttributeValueSuccess(data));
  } catch (error) {
    yield put(createAttributeValueFailure(error));
  }
}

function* updateOneRequest(action) {
  try {
    const { data } = yield call(updateOne, action.payload);
    yield put(updateAttributeValueSuccess(data));
  } catch (error) {
    yield put(updateAttributeValueFailure(error));
  }
}

function* deleteOneRequest(action) {
  try {
    yield call(deleteOne, action.payload);
    yield put(deleteAttributeValueSuccess(action.payload));
  } catch (error) {
    yield put(deleteAttributeValueFailure(error));
  }
}

function* attributeSaga() {
  yield takeLatest(getAttributeValuesStart.type, getAllRequest);
  yield takeLatest(getAttributeValueStart.type, getOneRequest);
  yield takeLatest(createAttributeValueStart.type, createOneRequest);
  yield takeLatest(updateAttributeValueStart.type, updateOneRequest);
  yield takeLatest(deleteAttributeValueStart.type, deleteOneRequest);
}

export default attributeSaga;
