import './App.css';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store, { RootState } from '~/redux/store';
import AppRoutes from '~/routes/AppRoutes';
import { AuthProvider } from '~/contexts/AuthProvider';
import { I18nextProvider } from 'react-i18next';
import i18n from '~/i18n';
import '~/i18n';
import { SnackbarProvider, useSnackbar } from 'notistack';
import 'react-widgets/styles.css';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { useEffect } from 'react';
import { clearNotification } from '~/redux/noti/slice';

const NotificationListener = () => {
  const { enqueueSnackbar } = useSnackbar();
  const notification = useSelector((state: RootState) => state.noti);
  const dispatch = useDispatch();

  useEffect(() => {
    if (notification) {
      enqueueSnackbar(notification.message, { variant: notification.variant });
      dispatch(clearNotification());
    }
  }, [notification, enqueueSnackbar, dispatch]);

  return null;
};

function App() {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <SnackbarProvider maxSnack={6}>
            <AuthProvider>
              <NotificationListener />
              <AppRoutes />
            </AuthProvider>
          </SnackbarProvider>
        </LocalizationProvider>
      </I18nextProvider>
    </Provider>
  );
}

export default App;
