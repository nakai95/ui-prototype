import React from 'react';

import { Routes, Route, BrowserRouter } from 'react-router-dom';

import { AppLayout } from '@/presentations/layouts';
import { HomePage, LoginPage } from '@/presentations/pages';

import { ProtectedRoute } from './components';

export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
