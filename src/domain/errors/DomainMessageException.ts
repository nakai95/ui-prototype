import { ApplicationException } from "./ApplicationException";

/**
 * ドメインメッセージエラー
 * @param errorMessageKey エラーメッセージのリソースキー
 */
export class DomainMessageException extends ApplicationException {
  public readonly errorMessageKeys: string[];
  public readonly sourceError?: Error;
  constructor(errorMessageKeys: string | string[], sourceError?: Error) {
    if (!Array.isArray(errorMessageKeys)) {
      errorMessageKeys = [errorMessageKeys];
    }
    super(errorMessageKeys.join(","));
    this.errorMessageKeys = errorMessageKeys;
    this.sourceError = sourceError;
  }
}
