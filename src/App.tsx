import './App.css';
import { Provider } from 'react-redux';
import store from '~/redux/store';
import AppRoutes from '~/routes/AppRoutes';
import { AuthProvider } from '~/contexts/AuthProvider';
import { I18nextProvider } from 'react-i18next';
import i18n from '~/i18n';
import '~/i18n';
import { SnackbarProvider } from 'notistack';
import 'react-widgets/styles.css';

function App() {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <SnackbarProvider maxSnack={6}>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </SnackbarProvider>
      </I18nextProvider>
    </Provider>
  );
}

export default App;
