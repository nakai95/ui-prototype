import React from 'react';

import { Navigate, useLocation } from 'react-router-dom';

import { useGetCurrentSessionQuery } from '@/presentations/hooks/queries';

interface AuthCheckerProps {
  children: React.ReactNode;
}

/**
 * 認証状態をチェックする内部コンポーネント
 */
export const AuthChecker: React.FC<AuthCheckerProps> = ({ children }) => {
  const location = useLocation();
  const { data: session } = useGetCurrentSessionQuery();

  // セッションが存在しない場合はログインページにリダイレクト
  if (!session) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 認証済みの場合は子コンポーネントを表示
  return <>{children}</>;
};
