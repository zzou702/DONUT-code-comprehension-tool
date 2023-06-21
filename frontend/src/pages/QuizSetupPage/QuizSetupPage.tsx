import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { Icon, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { createTheme, Theme, ThemeProvider } from '@mui/material/styles';

// Create a theme using createTheme
const theme: Theme = createTheme({
  palette: {
    primary: {
      main: '#222222',
      contrastText: '#fff',
    },
    secondary: {
      main: '#FFFFFF',
      contrastText: '#fff',
    },
  },
});


export default function QuizSetupPage() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, 
        py: 2,
        px: 10, 
        display: 'flex',
        flexDirection: 'column',}}>
        <Grid container spacing={3} >
          <Grid item xs={1}>
            <IconButton size="large">
              <ChevronLeftIcon fontSize="inherit"/>
            </IconButton>
          </Grid>
          <Grid item xs={10}>
            <Typography variant="h5" align='center' sx={{fontFamily:'Monospace' }}>
              Quiz options
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <IconButton size="large">
              <AccountCircleIcon fontSize="inherit"/>
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" align='center' sx={{fontFamily:'Monospace' }}>
              Select a mode
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              width: 300,
              height: 500,
              backgroundColor: '#ffffff',
            }}>
                <Typography variant="h6" align='center' color="primary" sx={{fontFamily:'Monospace'}}>
                  Practice
                </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            Hello
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
