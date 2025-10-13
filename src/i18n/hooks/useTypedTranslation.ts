import { useTranslation as useI18nTranslation } from 'react-i18next';

import { tKeys } from './tKeys';

export function useTypedTranslation() {
  const { t, i18n } = useI18nTranslation();

  return {
    t,
    tKeys,
    i18n,
  };
}
