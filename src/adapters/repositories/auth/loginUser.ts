import '@/adapters/axios';

import { loginUser as loginUserApi } from '@/adapters/generated/auth';
import type { LoginCredentials, LoginResult } from '@/domain/models/auth';

export type LoginUser = (credentials: LoginCredentials) => Promise<LoginResult>;

/**
 * ユーザーログイン
 * @param credentials ログイン認証情報
 * @returns ログイン結果
 */
export const loginUser: LoginUser = async (
  credentials: LoginCredentials
): Promise<LoginResult> => {
  const { data, message } = await loginUserApi({
    email: credentials.email,
    username: credentials.username,
    password: credentials.password,
    rememberMe: credentials.rememberMe,
  });

  return {
    message,
    session: {
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
    },
  };
};
