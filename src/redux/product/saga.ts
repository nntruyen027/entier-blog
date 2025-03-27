import { call, put, takeLatest } from 'redux-saga/effects';
import {
  createProductFailure,
  createProductStart,
  createProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  getProductFailure,
  getProductsFailure,
  getProductsStart,
  getProductsSuccess,
  getProductStart,
  getProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductTagStart,
  updateProductAttributeSuccess, updateProductAttributeStart, updateProductAttributeFailure
} from './slice';
import { assignTags, createOne, deleteOne, getAll, getOne, updateOne, updateAttribute } from './api';

function* getAllRequest(action) {
  try {
    const { data } = yield call(getAll, action.payload);
    yield put(getProductsSuccess(data));
  } catch (error) {
    yield put(getProductsFailure(error));
  }
}

function* getOneRequest(action) {
  try {
    const { data } = yield call(getOne, action.payload);
    yield put(getProductSuccess(data));
  } catch (error) {
    yield put(getProductFailure(error));
  }
}

function* createOneRequest(action) {
  try {
    const { data } = yield call(createOne, action.payload);
    yield put(createProductSuccess(data));
  } catch (error) {
    yield put(createProductFailure(error));
  }
}

function* updateOneRequest(action) {
  try {
    const { data } = yield call(updateOne, action.payload);
    yield put(updateProductSuccess(data));
  } catch (error) {
    yield put(updateProductFailure(error));
  }
}

function* updateAttributeRequest(action) {
  try {
    const { data } = yield call(updateAttribute, action.payload);
    yield put(updateProductAttributeSuccess(data));
  } catch (error) {
    yield put(updateProductAttributeFailure(error));
  }
}

function* asigntTagsRequest(action) {
  try {
    const { data } = yield call(assignTags, action.payload);
    yield put(updateProductSuccess(data));
  } catch (error) {
    yield put(updateProductFailure(error));
  }
}

function* deleteOneRequest(action) {
  try {
    yield call(deleteOne, action.payload);
    yield put(deleteProductSuccess(action.payload));
  } catch (error) {
    yield put(deleteProductFailure(error));
  }
}

function* productSaga() {
  yield takeLatest(getProductsStart.type, getAllRequest);
  yield takeLatest(getProductStart.type, getOneRequest);
  yield takeLatest(createProductStart.type, createOneRequest);
  yield takeLatest(updateProductStart.type, updateOneRequest);
  yield takeLatest(updateProductTagStart.type, asigntTagsRequest);
  yield takeLatest(deleteProductStart.type, deleteOneRequest);
  yield takeLatest(updateProductAttributeStart.type, updateAttributeRequest);
}

export default productSaga;
