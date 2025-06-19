import React from 'react';

import DashboardIcon from '@mui/icons-material/Dashboard';

import { useTypedTranslation } from '@/i18n';

interface MenuItem {
  text: string;
  path: string;
  icon: React.ReactElement;
}

export const useMenuItems = (): MenuItem[] => {
  const { t, tKeys } = useTypedTranslation();

  return [
    { text: t(tKeys.navigation.dashboard), path: '/', icon: <DashboardIcon /> },
  ];
};
