import { useLocation, useNavigate } from 'react-router-dom';

import type { LoginCredentials } from '@/domain/models/auth';
import { useLoginMutation } from '@/presentations/hooks/queries';

export const useLoginPageNavigation = () => {
  const login = useLoginMutation();
  const location = useLocation();
  const navigate = useNavigate();

  // ProtectedRouteからのリダイレクト先を取得
  const from = location.state?.from?.pathname || '/';

  const handleLogin = (credentials: LoginCredentials) => {
    // ログイン処理を実行
    login.mutate(credentials, {
      onSuccess: () => {
        // ログイン成功後、元のページまたはホームページにリダイレクト
        navigate(from, { replace: true });
      },
    });
  };

  return {
    handleLogin,
    isLoading: login.isPending,
  };
};
