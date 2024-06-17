import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import Box from '@mui/material/Box';
import { NumericFormat } from 'react-number-format';
import { PropTypes } from 'prop-types';

const SavingsTotal = ({ totalSavings }) => {
  SavingsTotal.propTypes = {
    totalSavings: PropTypes.number.isRequired,
  };

  return (
    <Paper
      elevation={2}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: { xs: '1rem' },
        py: 2,
        px: 4,
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
        }}
      >
        <Box
          sx={{
            display: { sm: 'flex' },
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <AssuredWorkloadIcon
            sx={{
              fontSize: 40,
              color: '#00796B',
            }}
          />
          <Typography
            variant='h3'
            sx={{
              fontSize: '1.1rem',
              fontWeight: 'bold',
              textWrap: { sm: 'nowrap' },
            }}
          >
            Total de Ahorros
          </Typography>
        </Box>
        <NumericFormat
          value={totalSavings}
          thousandSeparator=','
          displayType='text'
          decimalScale={2}
          fixedDecimalScale={true}
          prefix='$'
          renderText={(value) => (
            <Typography color='#00796B' variant='h5' sx={{}}>
              {value}
            </Typography>
          )}
        />
      </Box>
      <Link to={'/savings'}>
        <Button
          variant='contained'
          startIcon={<EditIcon />}
          sx={{
            bgcolor: '#00796B',
            border: '1px solid #00796B',
            '&:hover': {
              bgcolor: 'white',
              border: '1px solid #00796B',
              color: '#00796B',
            },
          }}
          className='small-button'
        >
          Editar
        </Button>
      </Link>
    </Paper>
  );
};

export default SavingsTotal;
