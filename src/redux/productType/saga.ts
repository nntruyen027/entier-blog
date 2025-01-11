import { call, put, takeLatest } from 'redux-saga/effects';
import {
  createTypeFailure,
  createTypeStart,
  createTypeSuccess,
  deleteTypeFailure,
  deleteTypeStart,
  deleteTypeSuccess,
  getTypeFailure,
  getTypesFailure,
  getTypesStart,
  getTypesSuccess,
  getTypeStart,
  getTypeSuccess,
  updateTypeFailure,
  updateTypeStart,
  updateTypeSuccess
} from './slice';
import { createOne, deleteOne, getAll, getOne, updateOne } from './api';

function* getAllRequest(action) {
  try {
    const { data } = yield call(getAll, action.payload);
    yield put(getTypesSuccess(data));
  } catch (error) {
    yield put(getTypesFailure(error));
  }
}

function* getOneRequest(action) {
  try {
    const { data } = yield call(getOne, action.payload);
    yield put(getTypeSuccess(data));
  } catch (error) {
    yield put(getTypeFailure(error));
  }
}

function* createOneRequest(action) {
  try {
    const { data } = yield call(createOne, action.payload);
    yield put(createTypeSuccess(data));
  } catch (error) {
    yield put(createTypeFailure(error));
  }
}

function* updateOneRequest(action) {
  try {
    const { data } = yield call(updateOne, action.payload);
    yield put(updateTypeSuccess(data));
  } catch (error) {
    yield put(updateTypeFailure(error));
  }
}

function* deleteOneRequest(action) {
  try {
    yield call(deleteOne, action.payload);
    yield put(deleteTypeSuccess(action.payload));
  } catch (error) {
    yield put(deleteTypeFailure(error));
  }
}

function* typeSaga() {
  yield takeLatest(getTypesStart.type, getAllRequest);
  yield takeLatest(getTypeStart.type, getOneRequest);
  yield takeLatest(createTypeStart.type, createOneRequest);
  yield takeLatest(updateTypeStart.type, updateOneRequest);
  yield takeLatest(deleteTypeStart.type, deleteOneRequest);
}

export default typeSaga;
