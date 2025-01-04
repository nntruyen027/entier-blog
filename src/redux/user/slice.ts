import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  user: null,
  error: null,
  users: [],
  rowCount: 0,
  pageCount: 1,
  resetSuccess: null
};

const UserSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    getUsersStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    getUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload.content;
      state.rowCount = action.payload?.totalElements || 1;
      state.pageCount = action.payload?.totalPages || 1;
    },
    getUsersFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    createUserStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    createUserSuccess: (state, action) => {
      state.users.push(action.payload);
      state.rowCount = state.rowCount + 1;
    },
    createUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateUserStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    updateUserSuccess: (state, action) => {
      const index = state.users.findIndex((role) => role.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload; // Cập nhật role tại vị trí tìm thấy
      }
      state.loading = false;
    },
    updateUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteUserStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    deleteUserSuccess: (state, action) => {
      state.users = state.users.filter((role) => {
        return role.id != action.payload;
      }); // Xóa role dựa vào id
      state.loading = false;
      state.rowCount = state.rowCount - 1;
    },
    deleteUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    assignRolesStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    assignRolesSuccess: (state, action) => {
      state.loading = false;
    },
    assignRolesFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    resetPassStart: (state, action) => {
      state.loading = true;
      state.error = null;
      state.resetSuccess = null;
    },
    resetPassSuccess: (state, action) => {
      state.loading = false;
      state.resetSuccess = true;
    },
    resetPassFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.resetSuccess = false;
    },
    resetStateStart: (state) => {
      state.loading = false;
      state.error = null;
      state.resetSuccess = null;
    }
  }
});

export const {
  createUserStart,
  createUserSuccess,
  createUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  getUsersSuccess,
  getUsersStart,
  getUsersFailure,
  assignRolesStart,
  assignRolesSuccess,
  assignRolesFailure,
  resetPassStart,
  resetPassSuccess,
  resetPassFailure,
  resetStateStart
} = UserSlice.actions;

export default UserSlice.reducer;
