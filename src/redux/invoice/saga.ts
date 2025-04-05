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
import { showNotification } from '~/redux/noti/slice'; // Import showNotification

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
    yield put(showNotification({ message: 'Lấy thông tin hoá đơn thất bại!', variant: 'error' }));
  }
}

function* createOneRequest(action) {
  try {
    const { data } = yield call(createOne, action.payload);
    yield put(createInvoiceSuccess(data));
    yield put(showNotification({ message: 'Tạo hoá đơn thành công!', variant: 'success' }));
  } catch (error) {
    yield put(createInvoiceFailure(error));
    yield put(showNotification({ message: 'Tạo hoá đơn thất bại!', variant: 'error' }));
  }
}

function* updateOneRequest(action) {
  try {
    const { data } = yield call(updateOne, action.payload);
    yield put(updateInvoiceSuccess(data));
    yield put(showNotification({ message: 'Cập nhật hoá đơn thành công!', variant: 'success' }));
  } catch (error) {
    yield put(updateInvoiceFailure(error));
    yield put(showNotification({ message: 'Cập nhật hoá đơn thất bại!', variant: 'error' }));
  }
}

function* deleteOneRequest(action) {
  try {
    yield call(deleteOne, action.payload);
    yield put(deleteInvoiceSuccess(action.payload));
    yield put(showNotification({ message: 'Xoá hoá đơn thành công!', variant: 'success' }));
  } catch (error) {
    yield put(deleteInvoiceFailure(error));
    yield put(showNotification({ message: 'Xoá hoá đơn thất bại!', variant: 'error' }));
  }
}

function* generatePdfRequest(action) {
  try {
    yield call(generatePdf, action.payload);
    yield put(generatePdfSuccess());
    yield put(showNotification({ message: 'Tạo PDF hoá đơn thành công!', variant: 'success' }));
  } catch (error) {
    yield put(generatePdfFailure(error));
    yield put(showNotification({ message: 'Tạo PDF hoá đơn thất bại!', variant: 'error' }));
  }
}

function* doStatisticsRequest(action) {
  try {
    const { data } = yield call(doStatistics, action.payload);
    yield put(doStatisticsSuccess(data));
  } catch (error) {
    yield put(doStatisticsFailure(error));
    yield put(showNotification({ message: 'Thống kê thất bại!', variant: 'error' }));
  }
}

function* doQuarterlyStatisticsRequest(action) {
  try {
    const { data } = yield call(doQuarterlyStatistics, action.payload);
    yield put(doQuarterlyStatisticsSuccess(data));
  } catch (error) {
    yield put(doQuarterlyStatisticsFailure(error));
    yield put(showNotification({ message: 'Thống kê quý thất bại!', variant: 'error' }));
  }
}

function* doMonthlyStatisticsRequest(action) {
  try {
    const { data } = yield call(doMonthlyStatistics, action.payload);
    yield put(doMonthlyStatisticsSuccess(data));
  } catch (error) {
    yield put(doMonthlyStatisticsFailure(error));
    yield put(showNotification({ message: 'Thống kê tháng thất bại!', variant: 'error' }));
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
