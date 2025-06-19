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
  const { data } = await loginUserApi({
    email: credentials.email,
    username: credentials.username,
    password: credentials.password,
    rememberMe: credentials.rememberMe,
  });

  return {
    message: data.message,
    session: {
      user: {
        id: data.data.user.id,
        username: data.data.user.username,
        email: data.data.user.email,
        fullName: data.data.user.fullName ?? null,
      },
      sessionInfo: data.data.sessionInfo
        ? {
            expiresAt: new Date(data.data.sessionInfo.expiresAt),
            csrfToken: data.data.sessionInfo.csrfToken,
          }
        : undefined,
    },
  };
};
