import React from 'react';

import { LoginForm, LoginHeader } from './components';
import { useLoginPageNavigation } from './hooks';
import * as S from './styled';

export const LoginPage: React.FC = () => {
  const { handleLogin, isLoading } = useLoginPageNavigation();

  return (
    <S.LoginContainer>
      <S.LoginCard>
        <LoginHeader />
        <LoginForm onLoginClick={handleLogin} isLoading={isLoading} />
      </S.LoginCard>
    </S.LoginContainer>
  );
};
