import React, { Suspense } from 'react';

import { ErrorBoundary } from 'react-error-boundary';

import { LoadingOverlay } from '@/presentations/components';

import { AuthErrorFallback, AuthChecker } from './components';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * 認証が必要なルートを保護するコンポーネント
 * @remarks useSuspenseQueryを使用しているため、SuspenseとError Boundaryで包む必要がある
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  return (
    <ErrorBoundary FallbackComponent={AuthErrorFallback}>
      <Suspense fallback={<LoadingOverlay open />}>
        <AuthChecker>{children}</AuthChecker>
      </Suspense>
    </ErrorBoundary>
  );
};
