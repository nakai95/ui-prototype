import React from 'react';

import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import { useLocation } from 'react-router-dom';

import { useMenuItems } from '../../hooks';

import * as S from './styled';

interface AppSidebarProps {
  open: boolean;
  width: number;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ open, width }) => {
  const location = useLocation();
  const menuItems = useMenuItems();

  return (
    <S.SidebarDrawer
      variant="persistent"
      anchor="left"
      open={open}
      width={width}
    >
      <Toolbar />
      <S.SidebarContent>
        <List>
          {menuItems.map((item) => (
            <S.NavigationListItem key={item.text} disablePadding>
              <S.NavigationLink to={item.path}>
                <S.NavigationButton selected={location.pathname === item.path}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </S.NavigationButton>
              </S.NavigationLink>
            </S.NavigationListItem>
          ))}
        </List>
      </S.SidebarContent>
    </S.SidebarDrawer>
  );
};
