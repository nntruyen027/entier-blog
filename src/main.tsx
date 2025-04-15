import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './main.scss';
import App from './App';
import '~/i18n';
import '@fortawesome/fontawesome-free/css/all.min.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
