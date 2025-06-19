import { renderHook, act } from '@testing-library/react';
import { describe, test, expect } from 'vitest';

import { useLoginForm } from '../useLoginForm';

describe('useLoginForm', () => {
  const hook = () => renderHook(() => useLoginForm());
  test.concurrent('初期状態が正しく設定される', () => {
    const { result } = hook();

    expect(result.current.email).toBe('');
    expect(result.current.password).toBe('');
    expect(result.current.rememberMe).toBe(false);
    expect(result.current.credentials).toEqual({
      email: '',
      password: '',
      rememberMe: false,
    });
  });

  test.concurrent('メールアドレスが正しく変更される', () => {
    const { result } = hook();

    act(() => {
      result.current.handleChangeEmail('test@example.com');
    });

    expect(result.current.email).toBe('test@example.com');
    expect(result.current.credentials.email).toBe('test@example.com');
  });

  test.concurrent('パスワードが正しく変更される', () => {
    const { result } = hook();

    act(() => {
      result.current.handleChangePassword('password123');
    });

    expect(result.current.password).toBe('password123');
    expect(result.current.credentials.password).toBe('password123');
  });

  test.concurrent('rememberMeが正しく変更される', () => {
    const { result } = hook();

    act(() => {
      result.current.handleChangeRememberMe(true);
    });

    expect(result.current.rememberMe).toBe(true);
    expect(result.current.credentials.rememberMe).toBe(true);
  });

  test.concurrent('credentialsが正しい認証情報を返す', () => {
    const { result } = hook();

    act(() => {
      result.current.handleChangeEmail('user@example.com');
      result.current.handleChangePassword('secret123');
      result.current.handleChangeRememberMe(true);
    });

    expect(result.current.credentials).toEqual({
      email: 'user@example.com',
      password: 'secret123',
      rememberMe: true,
    });
  });

  test.concurrent('複数の値を順次変更できる', () => {
    const { result } = hook();

    // 最初の設定
    act(() => {
      result.current.handleChangeEmail('first@example.com');
      result.current.handleChangePassword('password1');
      result.current.handleChangeRememberMe(true);
    });

    expect(result.current.credentials).toEqual({
      email: 'first@example.com',
      password: 'password1',
      rememberMe: true,
    });

    // 値を変更
    act(() => {
      result.current.handleChangeEmail('second@example.com');
      result.current.handleChangePassword('password2');
      result.current.handleChangeRememberMe(false);
    });

    expect(result.current.credentials).toEqual({
      email: 'second@example.com',
      password: 'password2',
      rememberMe: false,
    });
  });

  test.concurrent('一つの値を変更しても他の値は保持される', () => {
    const { result } = hook();

    // 初期設定
    act(() => {
      result.current.handleChangeEmail('test@example.com');
      result.current.handleChangePassword('password123');
      result.current.handleChangeRememberMe(true);
    });

    // メールアドレスのみ変更
    act(() => {
      result.current.handleChangeEmail('updated@example.com');
    });

    expect(result.current.credentials).toEqual({
      email: 'updated@example.com',
      password: 'password123', // 変更されない
      rememberMe: true, // 変更されない
    });
  });
});
