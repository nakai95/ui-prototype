import React from 'react';

import { renderHook } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { RepositoryTestWrapper } from '@/__fixtures__/testWrappers';
import type { LoginCredentials } from '@/domain/models/auth';

import { useLoginPageNavigation } from '../useLoginPageNavigation';

describe('useLoginPageNavigation', () => {
  const mockLoginUser = vi.fn();

  const createWrapper = (
    initialEntries: (
      | string
      | { pathname: string; state?: { from?: { pathname: string } } }
    )[] = ['/login']
  ) => {
    return ({ children }: { children: React.ReactNode }) => (
      <RepositoryTestWrapper
        override={{
          auth: {
            loginUser: mockLoginUser,
          },
        }}
      >
        <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
      </RepositoryTestWrapper>
    );
  };

  test.concurrent('フックが正しく初期化される', () => {
    const wrapper = createWrapper();
    const { result } = renderHook(() => useLoginPageNavigation(), { wrapper });

    expect(result.current.handleLogin).toBeDefined();
    expect(result.current.isLoading).toBe(false);
  });

  test.concurrent('handleLogin関数がエラーなく実行される', () => {
    const wrapper = createWrapper();
    const { result } = renderHook(() => useLoginPageNavigation(), { wrapper });

    const credentials: LoginCredentials = {
      email: 'test@example.com',
      password: 'password123',
      rememberMe: false,
    };

    // 関数の実行がエラーなく完了することを確認
    expect(() => {
      result.current.handleLogin(credentials);
    }).not.toThrow();
  });

  test.concurrent('異なるルートの状態でもフックが動作する', () => {
    const wrapper = createWrapper([
      {
        pathname: '/login',
        state: { from: { pathname: '/dashboard' } },
      },
    ]);
    const { result } = renderHook(() => useLoginPageNavigation(), { wrapper });

    expect(result.current.handleLogin).toBeDefined();
    expect(result.current.isLoading).toBe(false);
  });
});
