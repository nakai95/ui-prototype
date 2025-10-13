import React, { Suspense } from 'react';

import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

import { AppErrorDialog } from '@/presentations/components';

interface PageWrapperProps {
  children: React.ReactNode;
}
/**
 * ページレベルのエラーハンドリングを提供するラッパーコンポーネント
 *
 * @remarks
 * - useSuspenseQuery のエラーを {@link ErrorBoundary} でキャッチ
 * - ページ内容は維持したまま {@link AppErrorDialog} でエラー表示
 * - {@link Suspense} によりデータ取得前にchildrenを描画させない
 *
 * @example
 * ```tsx
 * // AppLayout内での使用
 * <AppMain>
 *   <PageWrapper>
 *     <Outlet />
 *   </PageWrapper>
 * </AppMain>
 * ```
 */
export const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ error, resetErrorBoundary }) => (
            <AppErrorDialog error={error} onClose={resetErrorBoundary} />
          )}
        >
          <Suspense>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};
