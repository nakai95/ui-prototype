import '@/adapters/axios';

import { logoutUser as logoutUserApi } from '@/adapters/generated/auth';
import type { LogoutResult } from '@/domain/models/auth';

export type LogoutUser = () => Promise<LogoutResult>;

/**
 * ユーザーログアウト
 * @returns ログアウト結果
 */
export const logoutUser: LogoutUser = async (): Promise<LogoutResult> => {
  const data = await logoutUserApi();

  return {
    message: data.message,
  };
};
