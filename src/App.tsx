import { useEffect } from 'react';

import { AppRoutes } from '@/app/router';

import { AppProviders } from './app/providers';
import { useTypedTranslation } from './i18n';

function App() {
  const { t, i18n, tKeys } = useTypedTranslation();

  useEffect(() => {
    document.title = t(tKeys.title);
  }, [t, i18n.language, tKeys.title]);

  return (
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  );
}

export default App;
