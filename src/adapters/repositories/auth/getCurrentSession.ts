import '@/adapters/axios';

import { getSession as getSessionApi } from '@/adapters/generated/auth';
import type { AuthSession } from '@/domain/models/auth';

export type GetCurrentSession = () => Promise<AuthSession>;

/**
 * 現在のセッション情報を取得
 * @returns セッション情報
 */
export const getCurrentSession: GetCurrentSession =
  async (): Promise<AuthSession> => {
    const { data } = await getSessionApi();

    return {
      user: {
        id: data.user.id,
        username: data.user.username,
        email: data.user.email,
        fullName: data.user.fullName ?? null,
      },
      sessionInfo: data.sessionInfo
        ? {
            expiresAt: new Date(data.sessionInfo.expiresAt),
            csrfToken: data.sessionInfo.csrfToken,
          }
        : undefined,
    };
  };
