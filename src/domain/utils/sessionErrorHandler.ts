import { HTTP_STATUS_CODES } from '@/domain/constants';
import { WebApiException } from '@/domain/errors';

/**
 * セッションエラーをチェックして401ステータスだった場合にログインページにリダイレクトを行う
 * @param error エラー
 * @return 判定結果(true:セッション切れ, false:他のエラー)
 */
export const checkSessionExpire = (error: unknown): boolean => {
  if (
    error instanceof WebApiException &&
    error.statusCode === HTTP_STATUS_CODES.UNAUTHORIZED
  ) {
    window.location.replace(`${window.location.origin}/login`);
    return true;
  }
  return false;
};
