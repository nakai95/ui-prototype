/**
 * React Query のクエリキー定数
 */
export const QUERY_KEYS = {
  // 認証関連
  AUTH: {
    CURRENT_SESSION: ['auth', 'currentSession'],
  },

  // 今後の拡張例
  // USERS: {
  //   LIST: ['users', 'list'],
  //   DETAIL: (id: string) => ['users', 'detail', id],
  // },
  //
  // POSTS: {
  //   LIST: ['posts', 'list'],
  //   DETAIL: (id: string) => ['posts', 'detail', id],
  //   BY_CATEGORY: (category: string) => ['posts', 'category', category],
  // },
} as const;
