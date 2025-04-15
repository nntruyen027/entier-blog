import { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LoadingPage, NotFoundPage } from '~/pages';

import homeRoutes from './customerRoutes/homeRoutes';

import { AuthLayout, HomeLayout, MainLayout as AdminMainLayout } from '~/layouts';
import authRoutes from '~/routes/adminRoutes/authRoutes';
import adminMainRoutes from '~/routes/adminRoutes/mainRoutes';

const Routing = () => (
  <Suspense fallback={<LoadingPage />}>
    <Router>
      <Routes>
        {authRoutes.map(({ id, path, element }) => (
          <Route key={id} path={path} element={<AuthLayout>{element}</AuthLayout>} />
        ))}
        {adminMainRoutes.map(({ id, path, element, label }) => (
          <Route key={id} path={path} element={<AdminMainLayout title={label}>{element}</AdminMainLayout>} />
        ))}
        {homeRoutes.map(({ id, path, element, label }) => (
          <Route key={id} path={path} element={<HomeLayout title={label}>{element}</HomeLayout>} />
        ))}
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Router>
  </Suspense>
);

export default Routing;
