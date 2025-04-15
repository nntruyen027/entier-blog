import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  contactType: null,
  error: null,
  contactTypes: [],
  rowCount: 0,
  pageCount: 1
};

const ContactTypeSlice = createSlice({
  name: 'contactType',
  initialState: initialState,
  reducers: {
    getContactTypesStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    getContactTypesSuccess: (state, action) => {
      state.loading = false;
      state.contactTypes = action.payload.content;
      state.rowCount = action.payload?.totalElements || 1;
      state.pageCount = action.payload?.totalPages || 1;
    },
    getContactTypesFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    createContactTypeStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    createContactTypeSuccess: (state, action) => {
      state.contactTypes.push(action.payload);
      state.loading = false;
      state.rowCount = state.rowCount + 1;
    },
    createContactTypeFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateContactTypeStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    updateContactTypeSuccess: (state, action) => {
      const index = state.contactTypes.findIndex((contactType) => contactType.id === action.payload.id);
      if (index !== -1) {
        state.contactTypes[index] = action.payload; // Cập nhật contactType tại vị trí tìm thấy
      }
      state.loading = false;
    },
    updateContactTypeFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteContactTypeStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    deleteContactTypeSuccess: (state, action) => {
      state.contactTypes = state.contactTypes.filter((contactType) => {
        return contactType.id != action.payload;
      }); // Xóa contactType dựa vào id
      state.loading = false;
      state.rowCount = state.rowCount - 1;
    },
    deleteContactTypeFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const {
  createContactTypeStart,
  createContactTypeSuccess,
  createContactTypeFailure,
  deleteContactTypeStart,
  deleteContactTypeSuccess,
  deleteContactTypeFailure,
  updateContactTypeFailure,
  updateContactTypeStart,
  updateContactTypeSuccess,
  getContactTypesSuccess,
  getContactTypesStart,
  getContactTypesFailure
} = ContactTypeSlice.actions;

export default ContactTypeSlice.reducer;
