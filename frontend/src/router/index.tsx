import { Route, Routes, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const SymbolsView = lazy(() => import('@/components/SymbolsView'));
const StatementsView = lazy(() => import('@/components/StatementsView'));
const ProfileView = lazy(() => import('@/components/ProfileView'));

const Router = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route index element={<SymbolsView />} />
        <Route index path="profile" element={<ProfileView />} />
        <Route index path="statements" element={<StatementsView />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
