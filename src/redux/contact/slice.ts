import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  contact: null,
  error: null,
  contacts: [],
  rowCount: 0,
  pageCount: 1
};

const ContactSlice = createSlice({
  name: 'contact',
  initialState: initialState,
  reducers: {
    getContactsStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    getContactsSuccess: (state, action) => {
      state.loading = false;
      state.contacts = action.payload.content;
      state.rowCount = action.payload?.totalElements || 1;
      state.pageCount = action.payload?.totalPages || 1;
    },
    getContactsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    createContactStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    createContactSuccess: (state, action) => {
      state.contacts.push(action.payload);
      state.loading = false;
      state.rowCount = state.rowCount + 1;
    },
    createContactFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateContactStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    updateContactSuccess: (state, action) => {
      const index = state.contacts.findIndex((contact) => contact.id === action.payload.id);
      if (index !== -1) {
        state.contacts[index] = action.payload; // Cập nhật contact tại vị trí tìm thấy
      }
      state.loading = false;
    },
    updateContactFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteContactStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    deleteContactSuccess: (state, action) => {
      state.contacts = state.contacts.filter((contact) => {
        return contact.id != action.payload;
      }); // Xóa contact dựa vào id
      state.loading = false;
      state.rowCount = state.rowCount - 1;
    },
    deleteContactFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const {
  createContactStart,
  createContactSuccess,
  createContactFailure,
  deleteContactStart,
  deleteContactSuccess,
  deleteContactFailure,
  updateContactFailure,
  updateContactStart,
  updateContactSuccess,
  getContactsSuccess,
  getContactsStart,
  getContactsFailure
} = ContactSlice.actions;

export default ContactSlice.reducer;
