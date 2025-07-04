export const en = {
  title: 'ui-prototype',
  auth: {
    login: 'Login',
    logout: 'Logout',
  },
  navigation: {
    home: 'Home',
    dashboard: 'Dashboard',
  },
  homePage: {
    title: 'Dashboard',
    welcome: 'Welcome to Admin Dashboard. This is the main dashboard page.',
    overview: {
      title: 'System Overview',
      description: `I'm playing around with a modern web app setup.`,
    },
  },
  loginPage: {
    title: 'Login',
    subtitle: 'Please sign in to your account',
    form: {
      email: 'Email Address',
      password: 'Password',
      emailPlaceholder: 'Enter your email',
      passwordPlaceholder: 'Enter your password',
      loginButton: 'Login',
      rememberMe: 'Remember me',
    },
    forgotPassword: 'Forgot Password?',
  },
} as const;
