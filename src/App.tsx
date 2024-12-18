import './App.css';
import { Provider } from 'react-redux';
import store from '~/redux/store';
import AppRoutes from '~/routes/AppRoutes';
import { AuthProvider } from '~/contexts/AuthProvider';
import { I18nextProvider } from 'react-i18next';
import i18n from '~/i18n';
import '~/i18n';

function App() {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </I18nextProvider>
    </Provider>
  );
}

export default App;
