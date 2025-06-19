import { useMemo, useState } from 'react';

import type { LoginCredentials } from '@/domain/models/auth';

/**
 * LoginFormの状態管理を行うカスタムフック
 */
export const useLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const credentials: LoginCredentials = useMemo(
    () => ({
      email,
      password,
      rememberMe,
    }),
    [email, password, rememberMe]
  );

  const handleChangeEmail = (newEmail: string) => {
    setEmail(newEmail);
  };

  const handleChangePassword = (newPassword: string) => {
    setPassword(newPassword);
  };

  const handleChangeRememberMe = (newRememberMe: boolean) => {
    setRememberMe(newRememberMe);
  };

  return {
    email,
    password,
    rememberMe,
    credentials,
    handleChangeEmail,
    handleChangePassword,
    handleChangeRememberMe,
  };
};
