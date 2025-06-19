export const ja = {
  title: 'UIプロトタイプ',
  auth: {
    login: 'ログイン',
    logout: 'ログアウト',
  },
  navigation: {
    home: 'ホーム',
    dashboard: 'ダッシュボード',
  },
  homePage: {
    title: 'ダッシュボード',
    welcome:
      'Admin Dashboardへようこそ。こちらがメインのダッシュボードページです。',
    overview: {
      title: 'システム概要',
      description:
        'このダッシュボードでは、ファイル管理、ユーザー管理、レポート機能などが利用できます。',
    },
  },
  loginPage: {
    title: 'ログイン',
    subtitle: 'アカウントにログインしてください',
    form: {
      email: 'メールアドレス',
      password: 'パスワード',
      emailPlaceholder: 'メールアドレスを入力',
      passwordPlaceholder: 'パスワードを入力',
      loginButton: 'ログイン',
      rememberMe: 'ログイン状態を記録する',
    },
    forgotPassword: 'パスワードを忘れた場合',
  },
} as const;
