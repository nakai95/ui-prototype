import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, test, expect, vi, beforeEach } from 'vitest';

import { badRequestError } from '@/__fixtures__/errors';
import { RepositoryTestWrapper } from '@/__fixtures__/testWrappers';
import { i18n } from '@/i18n/config';

import { LoginForm } from '../LoginForm';

import {
  clickLoginButton,
  fillLoginForm,
  getLoginFormElements,
} from './testHelpers';

describe('LoginForm', () => {
  const loginUser = vi.fn();

  const renderLoginForm = () => {
    return render(
      <RepositoryTestWrapper
        override={{
          auth: {
            loginUser,
          },
        }}
      >
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>
      </RepositoryTestWrapper>
    );
  };

  beforeEach(() => {
    i18n.changeLanguage('ja');
    loginUser.mockClear();
  });

  test('正しくレンダリングされる', () => {
    renderLoginForm();

    // userIdフィールドはrequiredではないため*なし
    expect(
      screen.getByLabelText('メールアドレスまたはユーザー名')
    ).toBeInTheDocument();
    expect(screen.getByLabelText('パスワード *')).toBeInTheDocument();
    expect(screen.getByLabelText('ログイン状態を記録する')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'ログイン' })
    ).toBeInTheDocument();
    expect(screen.getByText('パスワードを忘れた場合')).toBeInTheDocument();
  });

  test('フォーム入力が正しく動作する', async () => {
    renderLoginForm();

    await fillLoginForm({
      userId: 'test@example.com',
      password: 'password123',
      rememberMe: true,
    });

    const { userIdInput, passwordInput, rememberMeCheckbox } =
      getLoginFormElements();

    expect(userIdInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
    expect(rememberMeCheckbox).toBeChecked();
  });

  test('rememberMeチェックボックスの状態変更が正しく動作する', async () => {
    const user = userEvent.setup();
    renderLoginForm();

    const rememberMeCheckbox = screen.getByLabelText('ログイン状態を記録する');

    // 初期状態: チェックなし
    expect(rememberMeCheckbox).not.toBeChecked();

    // チェックボックスをオンにする
    await user.click(rememberMeCheckbox);
    expect(rememberMeCheckbox).toBeChecked();

    // チェックボックスをオフにする
    await user.click(rememberMeCheckbox);
    expect(rememberMeCheckbox).not.toBeChecked();
  });

  test('フォームが送信されるとloginUserが呼ばれる', async () => {
    renderLoginForm();

    await fillLoginForm({
      userId: 'test@example.com',
      password: 'password123',
      rememberMe: true,
    });

    expect(loginUser).not.toHaveBeenCalled();

    await clickLoginButton();

    expect(loginUser).toHaveBeenCalledWith({
      userId: 'test@example.com',
      password: 'password123',
      rememberMe: true,
    });
  });
  describe('エラーハンドリング', () => {
    beforeEach(async () => {
      loginUser.mockRejectedValue(badRequestError);

      renderLoginForm();

      await fillLoginForm({
        userId: 'test@example.com',
        password: 'password123',
        rememberMe: true,
      });

      await clickLoginButton();
    });

    test('AppErrorDialogが表示されること', async () => {
      // エラーダイアログが表示されることを確認
      await waitFor(() => {
        const errorDialog = screen.getByTestId('appErrorDialog');
        expect(errorDialog).toBeInTheDocument();
      });
    });

    test('エラーダイアログのOKボタンをクリックするとダイアログが閉じること', async () => {
      const user = userEvent.setup();

      // エラーダイアログが表示されるまで待機
      await waitFor(() => {
        const errorDialog = screen.getByTestId('appErrorDialog');
        expect(errorDialog).toBeInTheDocument();
      });

      // OKボタンをクリック
      const okButton = screen.getByTestId('okButton');
      await user.click(okButton);

      // エラーダイアログが閉じることを確認
      await waitFor(() => {
        const errorDialog = screen.queryByTestId('appErrorDialog');
        expect(errorDialog).not.toBeInTheDocument();
      });
    });
  });
});
