import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, test, expect, vi, beforeEach } from 'vitest';

import { RepositoryTestWrapper } from '@/__fixtures__/testWrappers';
import { i18n } from '@/i18n/config';

import { LoginPage } from '../LoginPage';

import { fillLoginForm } from './loginTestHelpers';

describe('LoginPage', () => {
  const mockLoginUser = vi.fn();

  const renderWithRouter = () => {
    const initialEntries = ['/login'];
    return render(
      <RepositoryTestWrapper
        override={{
          auth: {
            loginUser: mockLoginUser,
          },
        }}
      >
        <MemoryRouter initialEntries={initialEntries}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<div data-testid="home-page" />} />
          </Routes>
        </MemoryRouter>
      </RepositoryTestWrapper>
    );
  };

  beforeEach(() => {
    i18n.changeLanguage('ja');
  });

  test('LoginFormにpropsが正しく渡される', () => {
    const r = renderWithRouter();

    const loginButton = r.getByRole('button', { name: 'ログイン' });
    expect(loginButton).not.toBeDisabled();
  });

  test('ログインが成功すると、ホームページにリダイレクトされる', async () => {
    const user = userEvent.setup();

    const r = renderWithRouter();

    await fillLoginForm({
      email: 'testuser@example.com',
      password: 'password123',
      rememberMe: false,
    });

    const loginButton = r.getByRole('button', { name: 'ログイン' });
    await user.click(loginButton);

    expect(mockLoginUser).toHaveBeenCalledWith({
      email: 'testuser@example.com',
      password: 'password123',
      rememberMe: false,
    });
  });
});
