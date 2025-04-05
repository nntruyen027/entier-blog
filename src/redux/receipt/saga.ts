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
import { showNotification } from '~/redux/noti/slice'; // Giả sử bạn có slice thông báo

function* getAllRequest(action) {
  try {
    const { data } = yield call(getAll, action.payload);
    yield put(getReceiptsSuccess(data));
  } catch (error) {
    yield put(getReceiptsFailure(error));
    yield put(showNotification({ message: 'Lấy danh sách biên lai thất bại!', variant: 'error' }));
  }
}

function* getOneRequest(action) {
  try {
    const { data } = yield call(getOne, action.payload);
    yield put(getReceiptSuccess(data));
  } catch (error) {
    yield put(getReceiptFailure(error));
    yield put(showNotification({ message: 'Lấy biên lai thất bại!', variant: 'error' }));
  }
}

function* createOneRequest(action) {
  try {
    const { data } = yield call(createOne, action.payload);
    yield put(createReceiptSuccess(data));
    yield put(showNotification({ message: 'Tạo biên lai thành công!', variant: 'success' }));
  } catch (error) {
    yield put(createReceiptFailure(error));
    yield put(showNotification({ message: 'Tạo biên lai thất bại!', variant: 'error' }));
  }
}

function* updateOneRequest(action) {
  try {
    const { data } = yield call(updateOne, action.payload);
    yield put(updateReceiptSuccess(data));
    yield put(showNotification({ message: 'Cập nhật biên lai thành công!', variant: 'success' }));
  } catch (error) {
    yield put(updateReceiptFailure(error));
    yield put(showNotification({ message: 'Cập nhật biên lai thất bại!', variant: 'error' }));
  }
}

function* deleteOneRequest(action) {
  try {
    yield call(deleteOne, action.payload);
    yield put(deleteReceiptSuccess(action.payload));
    yield put(showNotification({ message: 'Xóa biên lai thành công!', variant: 'success' }));
  } catch (error) {
    yield put(deleteReceiptFailure(error));
    yield put(showNotification({ message: 'Xóa biên lai thất bại!', variant: 'error' }));
  }
}

function* generatePdfRequest(action) {
  try {
    yield call(generatePdf, action.payload);
    yield put(generatePdfSuccess());
    yield put(showNotification({ message: 'Tạo PDF thành công!', variant: 'success' }));
  } catch (error) {
    yield put(generatePdfFailure(error));
    yield put(showNotification({ message: 'Tạo PDF thất bại!', variant: 'error' }));
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
    yield put(showNotification({ message: 'Thống kê theo quý thất bại!', variant: 'error' }));
  }
}

function* doMonthlyStatisticsRequest(action) {
  try {
    const { data } = yield call(doMonthlyStatistics, action.payload);
    yield put(doMonthlyStatisticsSuccess(data));
  } catch (error) {
    yield put(doMonthlyStatisticsFailure(error));
    yield put(showNotification({ message: 'Thống kê theo tháng thất bại!', variant: 'error' }));
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
