import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi, beforeEach } from 'vitest';

import { i18n } from '@/i18n/config';

import {
  fillLoginForm,
  getLoginFormElements,
} from '../../../__tests__/loginTestHelpers';
import { LoginForm } from '../LoginForm';

describe('LoginForm', () => {
  const mockOnLoginClick = vi.fn();

  beforeEach(() => {
    i18n.changeLanguage('ja');
  });

  test('正しくレンダリングされる', () => {
    render(<LoginForm onLoginClick={mockOnLoginClick} />);

    expect(screen.getByLabelText('メールアドレス *')).toBeInTheDocument();
    expect(screen.getByLabelText('パスワード *')).toBeInTheDocument();
    expect(screen.getByLabelText('ログイン状態を記録する')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'ログイン' })
    ).toBeInTheDocument();
    expect(screen.getByText('パスワードを忘れた場合')).toBeInTheDocument();
  });

  test('ローディング状態でボタンが無効になる', () => {
    render(<LoginForm onLoginClick={mockOnLoginClick} isLoading={true} />);

    expect(screen.getByRole('button', { name: 'ログイン' })).toBeDisabled();
  });

  test('フォーム入力が正しく動作する', async () => {
    const user = userEvent.setup();
    render(<LoginForm onLoginClick={mockOnLoginClick} />);

    const { emailInput, passwordInput, rememberMeCheckbox } =
      getLoginFormElements();

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(rememberMeCheckbox);

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
    expect(rememberMeCheckbox).toBeChecked();
  });

  test('ログインボタンクリックで正しい値が渡される', async () => {
    const user = userEvent.setup();
    render(<LoginForm onLoginClick={mockOnLoginClick} />);

    await fillLoginForm({
      email: 'user@example.com',
      password: 'secret123',
      rememberMe: true,
    });

    const loginButton = screen.getByRole('button', { name: 'ログイン' });
    await user.click(loginButton);

    expect(mockOnLoginClick).toHaveBeenCalledTimes(1);
    expect(mockOnLoginClick).toHaveBeenCalledWith({
      email: 'user@example.com',
      password: 'secret123',
      rememberMe: true,
    });
  });

  test('空の状態でログインボタンをクリックできる', async () => {
    const user = userEvent.setup();
    render(<LoginForm onLoginClick={mockOnLoginClick} />);

    const loginButton = screen.getByRole('button', { name: 'ログイン' });
    await user.click(loginButton);

    expect(mockOnLoginClick).toHaveBeenCalledTimes(1);
    expect(mockOnLoginClick).toHaveBeenCalledWith({
      email: '',
      password: '',
      rememberMe: false,
    });
  });

  test('rememberMeチェックボックスの状態変更が正しく動作する', async () => {
    const user = userEvent.setup();
    render(<LoginForm onLoginClick={mockOnLoginClick} />);

    const rememberMeCheckbox = screen.getByLabelText('ログイン状態を記録する');
    const loginButton = screen.getByRole('button', { name: 'ログイン' });

    // チェックボックスをオンにする
    await user.click(rememberMeCheckbox);
    expect(rememberMeCheckbox).toBeChecked();

    await user.click(loginButton);
    expect(mockOnLoginClick).toHaveBeenCalledWith({
      email: '',
      password: '',
      rememberMe: true,
    });

    mockOnLoginClick.mockClear();

    // チェックボックスをオフにする
    await user.click(rememberMeCheckbox);
    expect(rememberMeCheckbox).not.toBeChecked();

    await user.click(loginButton);
    expect(mockOnLoginClick).toHaveBeenCalledWith({
      email: '',
      password: '',
      rememberMe: false,
    });
  });
});
