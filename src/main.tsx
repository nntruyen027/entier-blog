import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { AuthProvider } from '~/contexts/AuthProvider';
import App from '~/App';
// import App from '~/App'
// import { AuthProvider } from './contexts/AuthProvider'
// import { AuthProvider } from ''

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
