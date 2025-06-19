import React from 'react';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useTypedTranslation } from '@/i18n';

import * as S from '../../styled';

import { usePasswordVisibility } from './hooks';

interface PasswordFieldProps {
  value: string;
  onChange: (value: string) => void;
}

/**
 * パスワード入力フィールド（表示切り替え機能付き）
 */
export const PasswordField: React.FC<PasswordFieldProps> = ({
  value,
  onChange,
}) => {
  const { t, tKeys } = useTypedTranslation();
  const { showPassword, togglePasswordVisibility } = usePasswordVisibility();

  return (
    <S.FormField
      fullWidth
      label={t(tKeys.loginPage.form.password)}
      placeholder={t(tKeys.loginPage.form.passwordPlaceholder)}
      type={showPassword ? 'text' : 'password'}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="togglePasswordVisibility"
                onClick={togglePasswordVisibility}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};
