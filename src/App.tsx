import { useRoutes } from 'react-router-dom';
import router from 'src/router';

import { Alert, Snackbar } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { CssBaseline } from '@mui/material';
import ThemeProvider from './theme/ThemeProvider';
import { IDataOpenAlert, useStatusAlert } from './stores/useStatusAlert';

function App() {
  const content = useRoutes(router);

  const [statusAlert, update] = useStatusAlert((state: IDataOpenAlert) => [
    state.statusAlert,
    state.update
  ]);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    update({ message: '', severity: 'success', open: false });
  };

  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        {content}
      </LocalizationProvider>

      <Snackbar
        open={statusAlert.open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={statusAlert.severity}
          sx={{ width: '100%' }}
        >
          {statusAlert.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
export default App;
