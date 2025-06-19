import React from 'react';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';

import type { LoginCredentials } from '@/domain/models/auth';
import { useTypedTranslation } from '@/i18n';

import * as S from '../../styled';
import { PasswordField } from '../PasswordField';

import { useLoginForm } from './hooks';

interface LoginFormProps {
  onLoginClick: (credentials: LoginCredentials) => void;
  isLoading?: boolean;
}

/**
 * ログインフォーム
 */
export const LoginForm: React.FC<LoginFormProps> = ({
  onLoginClick,
  isLoading = false,
}) => {
  const { t, tKeys } = useTypedTranslation();
  const {
    email,
    password,
    rememberMe,
    credentials,
    handleChangeEmail,
    handleChangePassword,
    handleChangeRememberMe,
  } = useLoginForm();

  const handleLoginClick = () => {
    onLoginClick(credentials);
  };

  return (
    <S.LoginFormContainer>
      <S.FormField
        fullWidth
        label={t(tKeys.loginPage.form.email)}
        placeholder={t(tKeys.loginPage.form.emailPlaceholder)}
        type="email"
        value={email}
        onChange={(e) => handleChangeEmail(e.target.value)}
        required
      />

      <PasswordField value={password} onChange={handleChangePassword} />

      <S.FormFooter>
        <S.RememberMeSection>
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={(e) => handleChangeRememberMe(e.target.checked)}
                color="primary"
              />
            }
            label={t(tKeys.loginPage.form.rememberMe)}
          />
        </S.RememberMeSection>

        <S.LoginButton
          fullWidth
          variant="contained"
          size="large"
          onClick={handleLoginClick}
          disabled={isLoading}
        >
          {t(tKeys.loginPage.form.loginButton)}
        </S.LoginButton>

        <S.ForgotPasswordSection>
          <Link href="#" underline="hover" color="primary">
            {t(tKeys.loginPage.forgotPassword)}
          </Link>
        </S.ForgotPasswordSection>
      </S.FormFooter>
    </S.LoginFormContainer>
  );
};
