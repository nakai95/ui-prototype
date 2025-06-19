/**
 * 認証関連のドメインモデル
 */

export interface User {
  /** ユーザーID */
  readonly id: string;
  /** ユーザー名 */
  readonly username: string;
  /** メールアドレス */
  readonly email: string;
  /** 氏名 */
  readonly fullName?: string | null;
}

export interface SessionInfo {
  /** セッション有効期限 */
  readonly expiresAt: Date;
  /** CSRF保護用トークン */
  readonly csrfToken?: string;
}

export interface LoginCredentials {
  /** メールアドレス */
  readonly email?: string;
  /** ユーザー名 */
  readonly username?: string;
  /** パスワード */
  readonly password: string;
  /** セッション長期保持フラグ */
  readonly rememberMe?: boolean;
}

export interface AuthSession {
  /** ユーザー情報 */
  readonly user: User;
  /** セッション情報 */
  readonly sessionInfo?: SessionInfo;
}

export interface LoginResult {
  /** 認証セッション */
  readonly session: AuthSession;
  /** レスポンスメッセージ */
  readonly message: string;
}

export interface LogoutResult {
  /** レスポンスメッセージ */
  readonly message: string;
}
