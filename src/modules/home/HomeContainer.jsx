import {
  Alert,
  Backdrop,
  CircularProgress,
  Grid,
  IconButton,
  Snackbar,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import IncomeExpenseComponent from './components/IncomeExpenseComponent';
import ExpenseByCategory from './components/ExpenseByCategory';
import RecentActivity from './components/RecentActivity';
import ModalHome from './components/ModalHome';
import { useState } from 'react';
import { useUser } from '../../context/UserContext';
import SavingsTotal from './components/SavingsTotal';
import BalanceInfo from './components/BalanceInfo';

const HomeContainer = () => {
  const [modal, setModal] = useState(false);
  const [type, setType] = useState('');
  const [alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { userData } = useUser();

  const handleCloseAlert = () => setAlert(false);
  const handleOpenAlert = (error = false) => {
    setAlert(true);
    setError(error);
  };

  const handleOpen = (formType) => {
    setType(formType);
    setModal(true);
  };
  const handleClose = () => setModal(false);

  return (
    <Grid
      container
      component='main'
      spacing={2}
      sx={{
        padding: '1rem',
      }}
    >
      {loading && (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color='inherit' />
        </Backdrop>
      )}

      <ModalHome
        open={modal}
        handleClose={handleClose}
        handleOpenAlert={handleOpenAlert}
        formType={type}
        setLoading={setLoading}
      />

      <Snackbar
        open={alert}
        onClose={handleCloseAlert}
        autoHideDuration={error ? 8000 : 3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          variant={error ? 'standard' : 'filled'}
          severity={error ? 'error' : 'success'}
          color={error ? 'error' : type === 'GASTO' ? 'info' : 'success'}
          action={
            <IconButton
              aria-label='close'
              color='inherit'
              size='small'
              onClick={handleCloseAlert}
            >
              <CloseIcon fontSize='inherit' />
            </IconButton>
          }
        >
          {error
            ? 'Ocurrió un error, intente más tarde'
            : type === 'GASTO'
              ? 'Tu gasto se registró con éxito!'
              : 'Tu ingreso se registró con éxito!'}
        </Alert>
      </Snackbar>

      <Grid item lg={8} md={6} xs={12}>
        {userData ? (
          <BalanceInfo
            totalBalance={userData.totalIncome}
            availableBalance={
              userData.totalIncome - userData.accumulatedSavings
            }
          />
        ) : (
          <CircularProgress color='inherit' />
        )}
      </Grid>
      <Grid item lg={4} md={6} xs={12}>
        {userData ? (
          <SavingsTotal totalSavings={userData.accumulatedSavings} />
        ) : (
          <CircularProgress color='inherit' />
        )}
      </Grid>
      <Grid
        item
        lg={8}
        md={6}
        xs={12}
        sx={{
          display: { lg: 'flex' },
          justifyContent: 'center',
          alignItems: 'start',
          gap: '4rem',
          maxWidth: { xs: '320px' },
          mx: 'auto',
        }}
      >
        <IncomeExpenseComponent handleOpen={handleOpen} />
        <ExpenseByCategory handleOpen={handleOpen} />
      </Grid>
      <Grid item lg={4} md={6} xs={12}>
        <RecentActivity />
      </Grid>
    </Grid>
  );
};

export default HomeContainer;
