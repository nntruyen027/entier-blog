import { configureStore, Middleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
// import authReducer from './auth/slice';
import rootSaga from './saga';
import rootReducer from './reducer';
import { showNotification } from './noti/slice';

const sagaMiddleware = createSagaMiddleware();

const notificationMiddleware: Middleware =
  (store) => (next) => (action: { type: 'string'; meta: { message: string } }) => {
    if (action.type.endsWith('_SUCCESS')) {
      store.dispatch(
        showNotification({
          message: action.meta?.message || 'Thành công!',
          variant: 'success'
        })
      );
    } else if (action.type.endsWith('_FAILURE')) {
      store.dispatch(
        showNotification({
          message: action.meta?.message || 'Thất bại!',
          variant: 'error'
        })
      );
    }
    return next(action);
  };

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware, notificationMiddleware)
});

sagaMiddleware.run(rootSaga);

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
