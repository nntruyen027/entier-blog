import { call, put, takeLatest } from 'redux-saga/effects';
import {
  createReceiptFailure,
  createReceiptStart,
  createReceiptSuccess,
  deleteReceiptFailure,
  deleteReceiptStart,
  deleteReceiptSuccess,
  doMonthlyStatisticsFailure,
  doMonthlyStatisticsStart,
  doMonthlyStatisticsSuccess,
  doQuarterlyStatisticsFailure,
  doQuarterlyStatisticsStart,
  doQuarterlyStatisticsSuccess,
  doStatisticsFailure,
  doStatisticsStart,
  doStatisticsSuccess,
  generatePdfFailure,
  generatePdfStart,
  generatePdfSuccess,
  getReceiptFailure,
  getReceiptsFailure,
  getReceiptsStart,
  getReceiptsSuccess,
  getReceiptStart,
  getReceiptSuccess,
  updateReceiptFailure,
  updateReceiptStart,
  updateReceiptSuccess
} from './slice';
import {
  createOne,
  deleteOne,
  doMonthlyStatistics,
  doQuarterlyStatistics,
  doStatistics,
  generatePdf,
  getAll,
  getOne,
  updateOne
} from './api';

function* getAllRequest(action) {
  try {
    const { data } = yield call(getAll, action.payload);
    yield put(getReceiptsSuccess(data));
  } catch (error) {
    yield put(getReceiptsFailure(error));
  }
}

function* getOneRequest(action) {
  try {
    const { data } = yield call(getOne, action.payload);
    yield put(getReceiptSuccess(data));
  } catch (error) {
    yield put(getReceiptFailure(error));
  }
}

function* createOneRequest(action) {
  try {
    const { data } = yield call(createOne, action.payload);
    yield put(createReceiptSuccess(data));
  } catch (error) {
    yield put(createReceiptFailure(error));
  }
}

function* updateOneRequest(action) {
  try {
    const { data } = yield call(updateOne, action.payload);
    yield put(updateReceiptSuccess(data));
  } catch (error) {
    yield put(updateReceiptFailure(error));
  }
}

function* deleteOneRequest(action) {
  try {
    yield call(deleteOne, action.payload);
    yield put(deleteReceiptSuccess(action.payload));
  } catch (error) {
    yield put(deleteReceiptFailure(error));
  }
}

function* generatePdfRequest(action) {
  try {
    yield call(generatePdf, action.payload);
    yield put(generatePdfSuccess());
  } catch (error) {
    yield put(generatePdfFailure(error));
  }
}

function* doStatisticsRequest(action) {
  try {
    const { data } = yield call(doStatistics, action.payload);
    yield put(doStatisticsSuccess(data));
  } catch (error) {
    yield put(doStatisticsFailure(error));
  }
}

function* doQuarterlyStatisticsRequest(action) {
  try {
    const { data } = yield call(doQuarterlyStatistics, action.payload);
    yield put(doQuarterlyStatisticsSuccess(data));
  } catch (error) {
    yield put(doQuarterlyStatisticsFailure(error));
  }
}

function* doMonthlyStatisticsRequest(action) {
  try {
    const { data } = yield call(doMonthlyStatistics, action.payload);
    yield put(doMonthlyStatisticsSuccess(data));
  } catch (error) {
    yield put(doMonthlyStatisticsFailure(error));
  }
}

function* receiptSaga() {
  yield takeLatest(getReceiptsStart.type, getAllRequest);
  yield takeLatest(getReceiptStart.type, getOneRequest);
  yield takeLatest(createReceiptStart.type, createOneRequest);
  yield takeLatest(updateReceiptStart.type, updateOneRequest);
  yield takeLatest(deleteReceiptStart.type, deleteOneRequest);
  yield takeLatest(generatePdfStart.type, generatePdfRequest);
  yield takeLatest(doStatisticsStart.type, doStatisticsRequest);
  yield takeLatest(doQuarterlyStatisticsStart.type, doQuarterlyStatisticsRequest);
  yield takeLatest(doMonthlyStatisticsStart.type, doMonthlyStatisticsRequest);
}

export default receiptSaga;
