import { HTTP_STATUS_CODES } from '@/domain/constants';
import { WebApiException } from '@/domain/errors';

import { checkSessionExpire } from '../sessionErrorHandler';

describe('checkSessionExpire', () => {
  // window.location.replaceをモック
  const mockReplace = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks(); // 明示的にモックをクリア

    // window.locationのモック
    Object.defineProperty(window, 'location', {
      value: {
        origin: 'http://localhost:3000',
        replace: mockReplace,
      },
      writable: true,
    });
  });
  afterEach(() => {
    vi.clearAllMocks(); // 明示的にモックをクリア
  });

  test('401エラーの場合、trueを返してログインページにリダイレクトする', () => {
    const error = new WebApiException(
      HTTP_STATUS_CODES.UNAUTHORIZED,
      'Unauthorized',
      { message: 'Session expired' }
    );

    const result = checkSessionExpire(error);

    expect(result).toBe(true);
    expect(mockReplace).toHaveBeenCalledWith('http://localhost:3000/login');
  });

  test('401以外のエラーの場合、falseを返してリダイレクトしない', () => {
    const error = new WebApiException(
      HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      'Internal Server Error',
      { message: 'Server error' }
    );

    const result = checkSessionExpire(error);

    expect(result).toBe(false);
    expect(mockReplace).not.toHaveBeenCalled();
  });

  test('WebApiException以外のエラーの場合、falseを返してリダイレクトしない', () => {
    const error = new Error('Network error');

    const result = checkSessionExpire(error);

    expect(result).toBe(false);
    expect(mockReplace).not.toHaveBeenCalled();
  });
});
