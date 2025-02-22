import { call, put, takeLatest } from 'redux-saga/effects';
import {
  createAttributeTypeFailure,
  createAttributeTypeStart,
  createAttributeTypeSuccess,
  deleteAttributeTypeFailure,
  deleteAttributeTypeStart,
  deleteAttributeTypeSuccess,
  getAttributeTypeFailure,
  getAttributeTypesFailure,
  getAttributeTypesStart,
  getAttributeTypesSuccess,
  getAttributeTypeStart,
  getAttributeTypeSuccess,
  updateAttributeTypeFailure,
  updateAttributeTypeStart,
  updateAttributeTypeSuccess
} from './slice';
import { createOne, deleteOne, getAll, getOne, updateOne } from './api';

function* getAllRequest(action) {
  try {
    const { data } = yield call(getAll, action.payload);
    yield put(getAttributeTypesSuccess(data));
  } catch (error) {
    yield put(getAttributeTypesFailure(error));
  }
}

function* getOneRequest(action) {
  try {
    const { data } = yield call(getOne, action.payload);
    yield put(getAttributeTypeSuccess(data));
  } catch (error) {
    yield put(getAttributeTypeFailure(error));
  }
}

function* createOneRequest(action) {
  try {
    const { data } = yield call(createOne, action.payload);
    yield put(createAttributeTypeSuccess(data));
  } catch (error) {
    yield put(createAttributeTypeFailure(error));
  }
}

function* updateOneRequest(action) {
  try {
    const { data } = yield call(updateOne, action.payload);
    yield put(updateAttributeTypeSuccess(data));
  } catch (error) {
    yield put(updateAttributeTypeFailure(error));
  }
}

function* deleteOneRequest(action) {
  try {
    yield call(deleteOne, action.payload);
    yield put(deleteAttributeTypeSuccess(action.payload));
  } catch (error) {
    yield put(deleteAttributeTypeFailure(error));
  }
}

function* attributeTypeSaga() {
  yield takeLatest(getAttributeTypesStart.type, getAllRequest);
  yield takeLatest(getAttributeTypeStart.type, getOneRequest);
  yield takeLatest(createAttributeTypeStart.type, createOneRequest);
  yield takeLatest(updateAttributeTypeStart.type, updateOneRequest);
  yield takeLatest(deleteAttributeTypeStart.type, deleteOneRequest);
}

export default attributeTypeSaga;
