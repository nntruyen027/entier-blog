import { call, put, takeLatest } from 'redux-saga/effects';
import {
  createInvoiceFailure,
  createInvoiceStart,
  createInvoiceSuccess,
  deleteInvoiceFailure,
  deleteInvoiceStart,
  deleteInvoiceSuccess,
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
  getInvoiceFailure,
  getInvoicesFailure,
  getInvoicesStart,
  getInvoicesSuccess,
  getInvoiceStart,
  getInvoiceSuccess,
  updateInvoiceFailure,
  updateInvoiceStart,
  updateInvoiceSuccess
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
    yield put(getInvoicesSuccess(data));
  } catch (error) {
    yield put(getInvoicesFailure(error));
  }
}

function* getOneRequest(action) {
  try {
    const { data } = yield call(getOne, action.payload);
    yield put(getInvoiceSuccess(data));
  } catch (error) {
    yield put(getInvoiceFailure(error));
  }
}

function* createOneRequest(action) {
  try {
    const { data } = yield call(createOne, action.payload);
    yield put(createInvoiceSuccess(data));
  } catch (error) {
    yield put(createInvoiceFailure(error));
  }
}

function* updateOneRequest(action) {
  try {
    const { data } = yield call(updateOne, action.payload);
    yield put(updateInvoiceSuccess(data));
  } catch (error) {
    yield put(updateInvoiceFailure(error));
  }
}

function* deleteOneRequest(action) {
  try {
    yield call(deleteOne, action.payload);
    yield put(deleteInvoiceSuccess(action.payload));
  } catch (error) {
    yield put(deleteInvoiceFailure(error));
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

function* invoiceSaga() {
  yield takeLatest(getInvoicesStart.type, getAllRequest);
  yield takeLatest(getInvoiceStart.type, getOneRequest);
  yield takeLatest(createInvoiceStart.type, createOneRequest);
  yield takeLatest(updateInvoiceStart.type, updateOneRequest);
  yield takeLatest(deleteInvoiceStart.type, deleteOneRequest);
  yield takeLatest(generatePdfStart.type, generatePdfRequest);
  yield takeLatest(doStatisticsStart.type, doStatisticsRequest);
  yield takeLatest(doQuarterlyStatisticsStart.type, doQuarterlyStatisticsRequest);
  yield takeLatest(doMonthlyStatisticsStart.type, doMonthlyStatisticsRequest);
}

export default invoiceSaga;
