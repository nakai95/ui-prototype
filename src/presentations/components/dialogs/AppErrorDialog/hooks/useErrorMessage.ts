import { useCallback } from 'react';

import { HTTP_STATUS } from '@/domain/constants';
import {
  NetworkException,
  WebApiException,
  type ApplicationException,
} from '@/domain/errors';
import { useTypedTranslation } from '@/i18n';

/**
 * エラーメッセージ変換
 */
export const useErrorMessage = () => {
  const { t, tKeys } = useTypedTranslation();
  const toMessageFromError = useCallback(
    (error: ApplicationException): string => {
      if (error instanceof NetworkException) {
        return t(tKeys.errors.general.networkError);
      }

      if (error instanceof WebApiException) {
        switch (error.statusCode) {
          case HTTP_STATUS.INTERNAL_SERVER_ERROR:
            return t(tKeys.errors.http.internalServerError);
          case HTTP_STATUS.BAD_REQUEST:
            return t(tKeys.errors.http.badRequest);
          case HTTP_STATUS.UNAUTHORIZED:
            return t(tKeys.errors.http.notLoggedIn);
          case HTTP_STATUS.FORBIDDEN:
            return t(tKeys.errors.http.forbidden);
          case HTTP_STATUS.NOT_FOUND:
            return t(tKeys.errors.http.notFound);
          case HTTP_STATUS.PAYLOAD_TOO_LARGE:
            return t(tKeys.errors.http.payloadTooLarge);
          case HTTP_STATUS.SERVICE_UNAVAILABLE:
            return t(tKeys.errors.http.serviceUnavailable);
          case HTTP_STATUS.GATEWAY_TIMEOUT:
            return t(tKeys.errors.http.gatewayTimeout);
        }
      }

      /**
       * このエラーメッセージに到達する場合
       * 基本的に開発者のエラーハンドリング対応が漏れている可能性があります。
       * 不明なエラーとしてスローします。上位層のErrorBoundary等でキャッチしてください。
       */
      throw error;
    },
    [t, tKeys]
  );

  return {
    toMessageFromError,
  };
};
