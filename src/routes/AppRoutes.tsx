import { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LoadingPage, NotFoundPage } from '~/pages';

// import {  } from '~/pages';
// import {  } from '~/layouts';
// import {  } from '~/routes';

const Routing = () => (
  <Suspense fallback={<LoadingPage />}>
    <Router>
      <Routes>
        {/* {adminMainRoutes.map(({ id, path, element }) => (
          <Route key={id} path={path} element={<AdminMainLayout>{element}</AdminMainLayout>} />
        ))} */}
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Router>
  </Suspense>
);

export default Routing;
