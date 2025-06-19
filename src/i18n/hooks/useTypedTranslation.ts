import { useTranslation as useI18nTranslation } from 'react-i18next';

import { ja } from '../locales/ja';

import { createKeys } from './utils';

const tKeys = createKeys(ja);

export function useTypedTranslation() {
  const { t, i18n } = useI18nTranslation();

  return {
    t: (key: string) => t(key),
    tKeys,
    i18n,
  };
}
