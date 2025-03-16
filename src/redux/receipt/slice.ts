import { createSlice } from '@reduxjs/toolkit';
import { Receipt } from '~/types';

interface ReceiptState {
  loading: boolean;
  receipt: Receipt | null;
  receipts: Receipt[];
  error: string | null;
  success: boolean | null;
  rowCount: number;
  pageCount: number;
  statistics: any;
}

const initialState: ReceiptState = {
  loading: false,
  receipt: null,
  receipts: [],
  error: null,
  success: null,
  rowCount: 0,
  pageCount: 1,
  statistics: null
};

const receiptSlice = createSlice({
  name: 'receipt',
  initialState,
  reducers: {
    getReceiptsStart: (state, action) => {
      state.loading = true;
      state.success = null;
      state.receipts = [];
      state.error = null;
    },
    getReceiptsSuccess: (state, action) => {
      state.receipts = action.payload.content;
      state.rowCount = action.payload?.totalElements || 1;
      state.pageCount = action.payload?.totalPages || 1;
      state.loading = false;
    },
    getReceiptsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    getReceiptStart: (state, action) => {
      state.loading = true;
      state.success = null;
      state.receipt = null;
      state.error = null;
    },
    getReceiptSuccess: (state, action) => {
      state.receipt = action.payload;
      state.loading = false;
    },
    getReceiptFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    createReceiptStart: (state, action) => {
      state.loading = true;
      state.success = null;
      state.error = null;
    },
    createReceiptSuccess: (state, action) => {
      state.receipts.push(action.payload);
      state.receipt = action.payload;
      state.loading = false;
      state.success = true;
    },
    createReceiptFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateReceiptStart: (state, action) => {
      state.loading = true;
      state.success = null;
      state.receipt = null;
      state.error = null;
    },
    updateReceiptSuccess: (state, action) => {
      const index = state.receipts.findIndex((receipt) => receipt.id === action.payload.id);
      if (index !== -1) {
        state.receipts[index] = action.payload;
      }
      state.receipt = action.payload;
      state.loading = false;
      state.success = true;
    },
    updateReceiptFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteReceiptStart: (state, action) => {
      state.loading = true;
      state.success = null;
      state.receipt = null;
      state.error = null;
    },
    deleteReceiptSuccess: (state, action) => {
      state.receipts = state.receipts.filter((receipt) => receipt.id !== action.payload);
      state.loading = false;
      state.success = true;
    },
    deleteReceiptFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    generatePdfStart: (state) => {
      state.loading = true;
    },
    generatePdfSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
    generatePdfFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    doStatisticsStart: (state) => {
      state.loading = true;
    },
    doStatisticsSuccess: (state, action) => {
      state.loading = false;
      state.statistics = action.payload;
    },
    doStatisticsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    doQuarterlyStatisticsStart: (state) => {
      state.loading = true;
    },
    doQuarterlyStatisticsSuccess: (state, action) => {
      state.loading = false;
      state.statistics = action.payload;
    },
    doQuarterlyStatisticsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    doMonthlyStatisticsStart: (state) => {
      state.loading = true;
    },
    doMonthlyStatisticsSuccess: (state, action) => {
      state.loading = false;
      state.statistics = action.payload;
    },
    doMonthlyStatisticsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const {
  getReceiptsStart,
  getReceiptsSuccess,
  getReceiptsFailure,
  getReceiptStart,
  getReceiptSuccess,
  getReceiptFailure,
  createReceiptStart,
  createReceiptSuccess,
  createReceiptFailure,
  updateReceiptStart,
  updateReceiptSuccess,
  updateReceiptFailure,
  deleteReceiptStart,
  deleteReceiptSuccess,
  deleteReceiptFailure,
  generatePdfStart,
  generatePdfSuccess,
  generatePdfFailure,
  doStatisticsStart,
  doStatisticsSuccess,
  doStatisticsFailure,
  doQuarterlyStatisticsStart,
  doQuarterlyStatisticsSuccess,
  doQuarterlyStatisticsFailure,
  doMonthlyStatisticsStart,
  doMonthlyStatisticsSuccess,
  doMonthlyStatisticsFailure
} = receiptSlice.actions;

export default receiptSlice.reducer;
