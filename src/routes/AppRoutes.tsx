import { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LoadingPage, NotFoundPage } from '~/pages';

import homeRoutes from './customerRoutes/homeRoutes';

import { HomeLayout } from '~/layouts';
import cartRoutes from '~/routes/customerRoutes/cartRoutes';
import CartLayout from '~/layouts/customerLayouts/CartLayout';

const Routing = () => (
  <Suspense fallback={<LoadingPage />}>
    <Router>
      <Routes>
        {homeRoutes.map(({ id, path, element }) => (
          <Route key={id} path={path} element={<HomeLayout>{element}</HomeLayout>} />
        ))}
        {cartRoutes.map(({ id, path, element }) => (
          <Route key={id} path={path} element={<CartLayout>{element}</CartLayout>} />
        ))}
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Router>
  </Suspense>
);

export default Routing;
