import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  user: null,
  error: null,
  users: [],
  rowCount: 0,
  pageCount: 1
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
      state.loading = false;
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
      const index = state.users.findIndex((user) => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload; // Cập nhật user tại vị trí tìm thấy
      }
      state.loading = false;
    },
    updateUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    assignRoleToUserStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    assignRoleToUserSuccess: (state, action) => {
      const index = state.users.findIndex((user) => user.username === action.payload.username);
      if (index !== -1) {
        state.users[index].roles = action.payload.roles; // Cập nhật user tại vị trí tìm thấy
      }
      state.loading = false;
    },
    assignRoleToUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteUserStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    deleteUserSuccess: (state, action) => {
      state.users = state.users.filter((user) => {
        return user.id != action.payload;
      });
      state.loading = false;
      state.rowCount = state.rowCount - 1;
    },
    deleteUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
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
  assignRoleToUserFailure,
  assignRoleToUserStart,
  assignRoleToUserSuccess
} = UserSlice.actions;

export default UserSlice.reducer;
