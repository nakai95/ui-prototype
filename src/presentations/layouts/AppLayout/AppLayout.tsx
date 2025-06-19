import React, { useState } from 'react';

import { Outlet } from 'react-router-dom';

import { AppBreadcrumbs, AppHeader, AppMain, AppSidebar } from './components';
import * as S from './styled';

const DRAWER_WIDTH = 240;

export const AppLayout: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <S.LayoutRoot>
      <AppHeader onMenuToggle={toggleDrawer} />
      <AppSidebar open={drawerOpen} width={DRAWER_WIDTH} />
      <AppMain drawerOpen={drawerOpen} drawerWidth={DRAWER_WIDTH}>
        <AppBreadcrumbs />
        <Outlet />
      </AppMain>
    </S.LayoutRoot>
  );
};
