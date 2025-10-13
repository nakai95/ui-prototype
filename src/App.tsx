import { useEffect } from 'react';

import { RouterProvider } from 'react-router-dom';

import { router } from '@/app/router';

import { AppProviders } from './app/providers';
import { useTypedTranslation } from './i18n';
import { loadZodLocale } from './i18n/zodLocale';

function App() {
  const { t, i18n, tKeys } = useTypedTranslation();

  useEffect(() => {
    document.title = t(tKeys.title);
  }, [t, i18n.language, tKeys.title]);

  useEffect(() => {
    loadZodLocale(i18n.language);
  }, [i18n.language]);

  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
}

export default App;
