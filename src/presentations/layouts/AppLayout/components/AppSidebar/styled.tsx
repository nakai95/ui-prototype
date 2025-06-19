import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';

export const SidebarDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'width',
})<{ width: number }>(({ width }) => ({
  width,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width,
    boxSizing: 'border-box',
    border: 'none',
  },
  [`@media (min-width: 900px)`]: {
    flexShrink: 0,
  },
}));

export const SidebarContent = styled(Box)(() => ({
  overflow: 'auto',
  padding: 16,
}));

export const NavigationListItem = styled(ListItem)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

export const NavigationLink = styled(RouterLink)(() => ({
  textDecoration: 'none',
  color: 'inherit',
  display: 'block',
  width: '100%',
}));

export const NavigationButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'component',
})(({ theme }) => ({
  borderRadius: theme.spacing(2),
}));
