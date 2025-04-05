import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NotificationState {
  message: string;
  variant: 'success' | 'error' | 'warning' | 'info';
}

const initialState: NotificationState | null = null;

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification: (state, action: PayloadAction<NotificationState>) => action.payload,
    clearNotification: () => null
  }
});

export const { showNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
