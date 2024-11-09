import './App.css';
import { Provider } from 'react-redux';
import store from '~/redux/store';
import AppRoutes from '~/routes/AppRoutes';
import { AuthProvider } from '~/contexts/AuthProvider';

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Provider>
  );
}

export default App;
