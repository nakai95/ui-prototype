import React from 'react';

import Toolbar from '@mui/material/Toolbar';

import * as S from './styled';

export interface AppContentsProps {
  drawerOpen: boolean;
  drawerWidth: number;
  children?: React.ReactNode;
}

export const AppMain: React.FC<AppContentsProps> = ({
  children,
  drawerOpen,
  drawerWidth,
}) => {
  return (
    <S.Main component="main" drawerOpen={drawerOpen} drawerWidth={drawerWidth}>
      <Toolbar />
      <S.ContentArea>
        <S.PageContainer>{children}</S.PageContainer>
      </S.ContentArea>
    </S.Main>
  );
};
