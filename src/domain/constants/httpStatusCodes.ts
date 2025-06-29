// HTTPステータスコード定数

// 成功レスポンス (2xx)
export const HTTP_STATUS_SUCCESS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
} as const;

// リダイレクション (3xx)
export const HTTP_STATUS_REDIRECT = {
  MOVED_PERMANENTLY: 301,
  FOUND: 302,
  NOT_MODIFIED: 304,
} as const;

// クライアントエラー (4xx)
export const HTTP_STATUS_CLIENT_ERROR = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
} as const;

// サーバーエラー (5xx)
export const HTTP_STATUS_SERVER_ERROR = {
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
} as const;

// 全ステータスコードの統合
export const HTTP_STATUS = {
  ...HTTP_STATUS_SUCCESS,
  ...HTTP_STATUS_REDIRECT,
  ...HTTP_STATUS_CLIENT_ERROR,
  ...HTTP_STATUS_SERVER_ERROR,
} as const;

// ステータスコードの型定義
export type HttpStatusCode = (typeof HTTP_STATUS)[keyof typeof HTTP_STATUS];

// よく使用されるステータスコードのエイリアス
export const HTTP_STATUS_CODES = {
  SUCCESS: HTTP_STATUS.OK,
  CREATED: HTTP_STATUS.CREATED,
  NO_CONTENT: HTTP_STATUS.NO_CONTENT,
  BAD_REQUEST: HTTP_STATUS.BAD_REQUEST,
  UNAUTHORIZED: HTTP_STATUS.UNAUTHORIZED,
  FORBIDDEN: HTTP_STATUS.FORBIDDEN,
  NOT_FOUND: HTTP_STATUS.NOT_FOUND,
  INTERNAL_SERVER_ERROR: HTTP_STATUS.INTERNAL_SERVER_ERROR,
  SERVICE_UNAVAILABLE: HTTP_STATUS.SERVICE_UNAVAILABLE,
} as const;
