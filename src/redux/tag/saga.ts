import { call, put, takeLatest } from 'redux-saga/effects';
import {
  createTagFailure,
  createTagStart,
  createTagSuccess,
  deleteTagFailure,
  deleteTagStart,
  deleteTagSuccess,
  getTagFailure,
  getTagsFailure,
  getTagsStart,
  getTagsSuccess,
  getTagStart,
  getTagSuccess,
  updateTagFailure,
  updateTagStart,
  updateTagSuccess
} from './slice';
import { createOne, deleteOne, getAll, getOne, updateOne } from './api';

function* getAllRequest(action) {
  try {
    const { data } = yield call(getAll, action.payload);
    yield put(getTagsSuccess(data));
  } catch (error) {
    yield put(getTagsFailure(error));
  }
}

function* getOneRequest(action) {
  try {
    const { data } = yield call(getOne, action.payload);
    yield put(getTagSuccess(data));
  } catch (error) {
    yield put(getTagFailure(error));
  }
}

function* createOneRequest(action) {
  try {
    const { data } = yield call(createOne, action.payload);
    yield put(createTagSuccess(data));
  } catch (error) {
    yield put(createTagFailure(error));
  }
}

function* updateOneRequest(action) {
  try {
    const { data } = yield call(updateOne, action.payload);
    yield put(updateTagSuccess(data));
  } catch (error) {
    yield put(updateTagFailure(error));
  }
}

function* deleteOneRequest(action) {
  try {
    yield call(deleteOne, action.payload);
    yield put(deleteTagSuccess(action.payload));
  } catch (error) {
    yield put(deleteTagFailure(error));
  }
}

function* typeSaga() {
  yield takeLatest(getTagsStart.type, getAllRequest);
  yield takeLatest(getTagStart.type, getOneRequest);
  yield takeLatest(createTagStart.type, createOneRequest);
  yield takeLatest(updateTagStart.type, updateOneRequest);
  yield takeLatest(deleteTagStart.type, deleteOneRequest);
}

export default typeSaga;
