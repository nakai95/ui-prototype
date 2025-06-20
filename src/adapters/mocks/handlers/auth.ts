import { http, HttpResponse, delay } from 'msw';

import {
  getLoginUserResponseMock,
  getLogoutUserResponseMock,
  getGetSessionResponseMock,
} from '@/adapters/generated/auth';
import {
  HTTP_STATUS_CLIENT_ERROR,
  HTTP_STATUS_SUCCESS,
} from '@/domain/constants';

// 簡単なCookieサポートを追加した認証APIのモックハンドラーを返す関数
export const getCustomAuthAPIMock = () => {
  // ログインハンドラーを拡張してSet-Cookieヘッダーを追加
  const loginWithCookie = http.post('*/auth/login', async () => {
    await delay(1000);
    return new HttpResponse(JSON.stringify(getLoginUserResponseMock()), {
      status: HTTP_STATUS_SUCCESS.OK,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie':
          'session_id=abc123; Path=/; Max-Age=86400; HttpOnly; SameSite=Strict',
      },
    });
  });

  // ログアウトハンドラーを拡張してCookie削除
  const logoutWithCookie = http.post('*/auth/logout', async () => {
    await delay(1000);

    return new HttpResponse(JSON.stringify(getLogoutUserResponseMock()), {
      status: HTTP_STATUS_SUCCESS.OK,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie':
          'session_id=; Path=/; Max-Age=0; HttpOnly; SameSite=Strict',
      },
    });
  });

  // Cookieを見てセッション情報を取得するハンドラー
  const sessionHandler = http.get('*/auth/session', async ({ cookies }) => {
    await delay(1000);

    console.log('Cookies:', cookies);

    const sessionId = cookies['session_id'];

    if (!sessionId) {
      return new HttpResponse(
        JSON.stringify({ error: 'セッションがありません' }),
        {
          status: HTTP_STATUS_CLIENT_ERROR.UNAUTHORIZED,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
    return new HttpResponse(JSON.stringify(getGetSessionResponseMock()), {
      status: HTTP_STATUS_SUCCESS.OK,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie':
          'session_id=abc123; Path=/;  Max-Age=86400; HttpOnly; SameSite=Strict',
      },
    });
  });
  return [loginWithCookie, logoutWithCookie, sessionHandler];
};
