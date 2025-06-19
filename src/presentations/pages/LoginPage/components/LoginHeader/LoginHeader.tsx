import React from 'react';

import Typography from '@mui/material/Typography';

import { useTypedTranslation } from '@/i18n';
import { Logo } from '@/presentations/components';

import * as S from '../../styled';

/**
 * ログインページのヘッダー部分（ロゴ、タイトル、サブタイトル）
 */
export const LoginHeader: React.FC = () => {
  const { t, tKeys } = useTypedTranslation();

  return (
    <S.LoginHeader>
      <Logo size={48} sx={{ mb: 2 }} />
      <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
        {t(tKeys.loginPage.title)}
      </Typography>
      <Typography variant="body1" color="text.secondary" textAlign="center">
        {t(tKeys.loginPage.subtitle)}
      </Typography>
    </S.LoginHeader>
  );
};
