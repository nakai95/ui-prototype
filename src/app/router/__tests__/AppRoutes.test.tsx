import { render, screen, waitFor } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';

import { mockAuthSession } from '@/__fixtures__/auth';
import { RepositoryTestWrapper } from '@/__fixtures__/testWrappers';
import { HTTP_STATUS_CLIENT_ERROR } from '@/domain/constants';
import { WebApiException } from '@/domain/errors';
import { i18n } from '@/i18n/config';

import { AppRoutes } from '../AppRoutes';

// Pageコンポーネントはモックしてテストする
vi.mock('@/presentations/pages', () => ({
  HomePage: () => <div data-testid="homePage">ダッシュボード</div>,
  LoginPage: () => <div data-testid="loginPage">ログイン</div>,
}));

describe('AppRoutes', () => {
  const mockGetCurrentSession = vi.fn();
  beforeEach(() => {
    i18n.changeLanguage('ja');
  });

  const createWrapper = () => {
    return ({ children }: { children: React.ReactNode }) => (
      <RepositoryTestWrapper
        override={{
          auth: {
            getCurrentSession: mockGetCurrentSession,
          },
        }}
      >
        {children}
      </RepositoryTestWrapper>
    );
  };

  test('セッション取得に成功した場合、HomePageがレンダリングされる', async () => {
    mockGetCurrentSession.mockResolvedValue(mockAuthSession);
    const wrapper = createWrapper();

    render(<AppRoutes />, { wrapper });

    await waitFor(() => {
      expect(mockGetCurrentSession).toHaveBeenCalledOnce();
    });

    await waitFor(() => {
      expect(screen.getByTestId('homePage')).toBeInTheDocument();
    });
  });
  test('セッション取得に失敗した場合、LoginPageがレンダリングされる', async () => {
    mockGetCurrentSession.mockRejectedValue(
      new WebApiException(
        HTTP_STATUS_CLIENT_ERROR.UNAUTHORIZED,
        'Unauthorized',
        {
          message: 'Session expired',
        }
      )
    );
    const wrapper = createWrapper();

    render(<AppRoutes />, { wrapper });

    await waitFor(() => {
      expect(mockGetCurrentSession).toHaveBeenCalledOnce();
    });

    await waitFor(() => {
      expect(screen.getByTestId('loginPage')).toBeInTheDocument();
    });
  });
});
