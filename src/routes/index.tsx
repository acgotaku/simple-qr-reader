import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

const QrReader = lazy(() => import('@/views/QrReader'));
const QRCode = lazy(() => import('@/views/QRCode'));

const AppRoutes = () => {
  return (
    <Suspense fallback="Loading...">
      <Routes>
        <Route path="/">
          <Route index element={<QrReader />} />
          <Route path="reader" element={<QrReader />} />
          <Route path="qrcode" element={<QRCode />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
