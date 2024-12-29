import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  role: null,
  error: null,
  roles: []
};

const RoleSlice = createSlice({
  name: 'role',
  initialState: initialState,
  reducers: {
    getRolesStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    getRolesSuccess: (state, action) => {
      state.loading = false;
      state.roles = action.payload;
    },
    getRolesFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    createRoleStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    createRoleSuccess: (state, action) => {
      state.role = action.payload;
      state.roles.push(action.payload);
    },
    createRoleFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateRoleStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    updateRoleSuccess: (state, action) => {
      state.role = action.payload;
      const index = state.roles.findIndex((role) => role.id === action.payload.id);
      if (index !== -1) {
        state.roles[index] = action.payload; // Cập nhật role tại vị trí tìm thấy
      }
      state.loading = false;
    },
    updateRoleFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteRoleStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteRoleSuccess: (state, action) => {
      state.roles = state.roles.filter((role) => role.id !== action.payload); // Xóa role dựa vào id
      state.loading = false;
    },
    deleteRoleFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const {
  createRoleStart,
  createRoleSuccess,
  createRoleFailure,
  deleteRoleStart,
  deleteRoleSuccess,
  deleteRoleFailure,
  updateRoleFailure,
  updateRoleStart,
  updateRoleSuccess,
  getRolesSuccess,
  getRolesStart,
  getRolesFailure
} = RoleSlice.actions;

export default RoleSlice.reducer;
