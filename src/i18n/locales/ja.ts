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
    welcome: 'Dashboardへようこそ。こちらがメインのダッシュボードページです。',
    overview: {
      title: 'システム概要',
      description:
        'モダンなウェブアプリケーションの構成を作ってみているところです。',
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
