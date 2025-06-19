import { type ReactNode } from 'react';

import { renderHook, act } from '@testing-library/react';
import i18n from 'i18next';
import { I18nextProvider } from 'react-i18next';

import { en } from '../../locales/en';
import { ja } from '../../locales/ja';
import { useTypedTranslation } from '../useTypedTranslation';

// テスト用のi18nインスタンスを作成
const createTestI18n = (lng = 'ja') => {
  const testI18n = i18n.createInstance();
  testI18n.init({
    lng,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      ja: {
        translation: ja,
      },
      en: {
        translation: en,
      },
    },
  });
  return testI18n;
};

// テスト用のWrapper関数
const createWrapper = (i18nInstance: typeof i18n) => {
  return ({ children }: { children: ReactNode }) => (
    <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>
  );
};

describe('useTypedTranslation', () => {
  test('基本的な翻訳機能が動作する', async () => {
    const testI18n = createTestI18n('ja');
    const wrapper = createWrapper(testI18n);

    const { result } = renderHook(() => useTypedTranslation(), { wrapper });

    expect(result.current.t('auth.login')).toBe('ログイン');
    expect(result.current.t('homePage.title')).toBe('ダッシュボード');
  });

  test('tKeysを使用した型安全な翻訳が動作する', async () => {
    const testI18n = createTestI18n('ja');
    const wrapper = createWrapper(testI18n);

    const { result } = renderHook(() => useTypedTranslation(), { wrapper });

    const { t, tKeys } = result.current;

    expect(tKeys.auth.login).toBe('auth.login');
    expect(t(tKeys.auth.login)).toBe('ログイン');
    expect(t(tKeys.homePage.overview.title)).toBe('システム概要');
  });

  test('言語切り替えが正しく動作する', async () => {
    const testI18n = createTestI18n('ja');
    const wrapper = createWrapper(testI18n);

    const { result } = renderHook(() => useTypedTranslation(), { wrapper });

    expect(result.current.t('auth.login')).toBe('ログイン');

    await act(async () => {
      await result.current.i18n.changeLanguage('en');
    });
    expect(result.current.t('auth.login')).toBe('Login');
  });

  test('フォールバック言語が動作する', async () => {
    const testI18n = createTestI18n('unknown');
    const wrapper = createWrapper(testI18n);

    const { result } = renderHook(() => useTypedTranslation(), { wrapper });

    expect(result.current.t('auth.login')).toBe('Login');
  });
});
