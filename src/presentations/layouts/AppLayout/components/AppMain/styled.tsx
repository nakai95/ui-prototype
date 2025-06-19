import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';

import type { BoxProps } from '@mui/material/Box';

interface MainProps extends BoxProps {
  drawerOpen: boolean;
  drawerWidth: number;
}

export const Main = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'drawerOpen' && prop !== 'drawerWidth',
})<MainProps>(({ theme, drawerOpen, drawerWidth }) => ({
  flexGrow: 1,
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: drawerOpen ? 0 : `-${drawerWidth}px`,
}));

export const ContentArea = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  paddingTop: theme.spacing(3),
  backgroundColor: theme.palette.action.hover,
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(2),
  borderRadius: theme.spacing(2),
}));

export const PageContainer = styled(Container)(() => ({}));
