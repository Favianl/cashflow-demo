import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { NumericFormat } from 'react-number-format';
import { PropTypes } from 'prop-types';

const BalanceInfo = ({ availableBalance, totalBalance }) => {
  BalanceInfo.propTypes = {
    availableBalance: PropTypes.number.isRequired,
    totalBalance: PropTypes.number.isRequired,
  };

  const [showAvailable, setShowAvailable] = useState(false);
  const [showTotal, setShowTotal] = useState(false);

  const toggleAvailable = () => {
    setShowAvailable(!showAvailable);
  };

  const toggleTotal = () => {
    setShowTotal(!showTotal);
  };

  return (
    <Paper
      elevation={2}
      sx={{
        textAlign: 'center',
        display: { sm: 'flex' },
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{
          flex: 1,
        }}
      >
        <Typography
          variant='h3'
          sx={{
            fontSize: '1.1rem',
            fontWeight: 'bold',
            paddingTop: '1rem',
          }}
        >
          Saldo Disponible
        </Typography>
        {showAvailable ? (
          <NumericFormat
            value={availableBalance}
            thousandSeparator=','
            displayType='text'
            decimalScale={2}
            fixedDecimalScale={true}
            prefix='$'
            renderText={(value) => (
              <Typography color='green' variant='h5'>
                {value}
              </Typography>
            )}
          />
        ) : (
          <Typography color='green' variant='h5'>
            ********
          </Typography>
        )}
        <button
          onClick={toggleAvailable}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            margin: 0,
          }}
        >
          {showAvailable ? (
            <VisibilityOffIcon sx={{ fontSize: '32px' }} />
          ) : (
            <VisibilityIcon sx={{ fontSize: '32px' }} />
          )}
        </button>
      </Box>

      <Box
        sx={{
          flex: 1,
        }}
      >
        <Typography
          variant='h3'
          sx={{
            fontSize: '1.1rem',
            fontWeight: 'bold',
            paddingTop: '1rem',
          }}
        >
          Saldo Total
        </Typography>
        {showTotal ? (
          <NumericFormat
            value={totalBalance}
            thousandSeparator=','
            displayType='text'
            decimalScale={2}
            fixedDecimalScale={true}
            prefix='$'
            renderText={(value) => (
              <Typography color='green' variant='h5'>
                {value}
              </Typography>
            )}
          />
        ) : (
          <Typography color='green' variant='h5'>
            ********
          </Typography>
        )}
        <button
          onClick={toggleTotal}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            margin: 0,
          }}
        >
          {showTotal ? (
            <VisibilityOffIcon sx={{ fontSize: '32px' }} />
          ) : (
            <VisibilityIcon sx={{ fontSize: '32px' }} />
          )}
        </button>
      </Box>
    </Paper>
  );
};

export default BalanceInfo;
