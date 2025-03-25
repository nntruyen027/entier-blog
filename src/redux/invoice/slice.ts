import { createSlice } from '@reduxjs/toolkit';
import { Invoice } from '~/types';

interface InvoiceState {
  loading: boolean;
  invoice: Invoice | null;
  invoices: Invoice[];
  error: string | null;
  success: boolean | null;
  rowCount: number;
  pageCount: number;
  quarterlyStatistics: any;
  monthlyStatistics: any;
  daylyStatistics: any;
}

const initialState: InvoiceState = {
  loading: false,
  invoice: null,
  invoices: [],
  error: null,
  success: null,
  rowCount: 0,
  pageCount: 1,
  quarterlyStatistics: null,
  daylyStatistics: null,
  monthlyStatistics: null
};

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    getInvoicesStart: (state, action) => {
      state.loading = true;
      state.success = null;
      state.invoices = [];
      state.error = null;
    },
    getInvoicesSuccess: (state, action) => {
      state.invoices = action.payload.content;
      state.rowCount = action.payload?.totalElements || 1;
      state.pageCount = action.payload?.totalPages || 1;
      state.loading = false;
    },
    getInvoicesFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    getInvoiceStart: (state, action) => {
      state.loading = true;
      state.success = null;
      state.invoice = null;
      state.error = null;
    },
    getInvoiceSuccess: (state, action) => {
      state.invoice = action.payload;
      state.loading = false;
    },
    getInvoiceFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    createInvoiceStart: (state, action) => {
      state.loading = true;
      state.success = null;
      state.error = null;
    },
    createInvoiceSuccess: (state, action) => {
      state.invoices.push(action.payload);
      state.invoice = action.payload;
      state.loading = false;
      state.success = true;
    },
    createInvoiceFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateInvoiceStart: (state, action) => {
      state.loading = true;
      state.success = null;
      state.invoice = null;
      state.error = null;
    },
    updateInvoiceSuccess: (state, action) => {
      const index = state.invoices.findIndex((invoice) => invoice.id === action.payload.id);
      if (index !== -1) {
        state.invoices[index] = action.payload;
      }
      state.invoice = action.payload;
      state.loading = false;
      state.success = true;
    },
    updateInvoiceFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteInvoiceStart: (state, action) => {
      state.loading = true;
      state.success = null;
      state.invoice = null;
      state.error = null;
    },
    deleteInvoiceSuccess: (state, action) => {
      state.invoices = state.invoices.filter((invoice) => invoice.id !== action.payload);
      state.loading = false;
      state.success = true;
    },
    deleteInvoiceFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    generatePdfStart: (state, action) => {
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
    doStatisticsStart: (state, action) => {
      state.loading = true;
    },
    doStatisticsSuccess: (state, action) => {
      state.loading = false;
      state.daylyStatistics = action.payload;
    },
    doStatisticsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    doQuarterlyStatisticsStart: (state, action) => {
      state.loading = true;
    },
    doQuarterlyStatisticsSuccess: (state, action) => {
      state.loading = false;
      state.quarterlyStatistics = action.payload;
    },
    doQuarterlyStatisticsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    doMonthlyStatisticsStart: (state, action) => {
      state.loading = true;
    },
    doMonthlyStatisticsSuccess: (state, action) => {
      state.loading = false;
      state.monthlyStatistics = action.payload;
    },
    doMonthlyStatisticsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const {
  getInvoicesStart,
  getInvoicesSuccess,
  getInvoicesFailure,
  getInvoiceStart,
  getInvoiceSuccess,
  getInvoiceFailure,
  createInvoiceStart,
  createInvoiceSuccess,
  createInvoiceFailure,
  updateInvoiceStart,
  updateInvoiceSuccess,
  updateInvoiceFailure,
  deleteInvoiceStart,
  deleteInvoiceSuccess,
  deleteInvoiceFailure,
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
} = invoiceSlice.actions;

export default invoiceSlice.reducer;
