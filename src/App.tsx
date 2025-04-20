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
import { useEffect, useState } from 'react';
import { clearNotification } from '~/redux/noti/slice';
import { getParamByKey } from '~/redux/param/api';
import 'quill-emoji/dist/quill-emoji.css';

// Import Ant Design components

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
  const [fav, setFav] = useState<string>('');

  useEffect(() => {
    const fetchName = async () => {
      try {
        const { value } = await getParamByKey('favicon');
        setFav(value);
      } catch (err) {
        console.error('Lỗi khi lấy fav:', err);
      }
    };
    fetchName();
  }, []);

  useEffect(() => {
    const favicon = document.getElementById('favicon') as HTMLLinkElement;
    if (favicon) {
      favicon.href = fav;
    }
    console.log(1, favicon, fav);
  }, [fav]);

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <SnackbarProvider maxSnack={6}>
          <AuthProvider>
            <NotificationListener />
            <AppRoutes />
          </AuthProvider>
        </SnackbarProvider>
      </I18nextProvider>
    </Provider>
  );
}

export default App;
