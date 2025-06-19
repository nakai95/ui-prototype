import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

export const LoginContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: `linear-gradient(135deg, ${theme.palette.primary.light}15, ${theme.palette.secondary.light}15)`,
  padding: theme.spacing(3),
}));

export const LoginCard = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 420,
  padding: theme.spacing(5),
  boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
  borderRadius: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
}));

export const LoginHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
  gap: theme.spacing(1),
}));

export const LoginFormContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

export const FormField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 12,
    backgroundColor: theme.palette.background.default,
    '&:hover': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main,
      },
    },
    '&.Mui-focused': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main,
        borderWidth: 2,
      },
    },
  },
  '& .MuiInputLabel-root': {
    fontWeight: 500,
  },
}));

export const LoginButton = styled(Button)(({ theme }) => ({
  borderRadius: 12,
  padding: theme.spacing(1.5, 3),
  textTransform: 'none',
  fontSize: '1rem',
  fontWeight: 600,
  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
  '&:hover': {
    transform: 'translateY(-1px)',
    boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
  },
  transition: 'all 0.2s ease-in-out',
}));

export const FormFooter = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  marginTop: theme.spacing(1),
}));

export const RememberMeSection = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
}));

export const ForgotPasswordSection = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
}));
