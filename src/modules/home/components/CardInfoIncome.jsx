import { Box, Paper, Typography, IconButton } from '@mui/material';
import FlightIcon from '@mui/icons-material/Flight';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import HomeIcon from '@mui/icons-material/Home';
import CommuteIcon from '@mui/icons-material/Commute';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SchoolIcon from '@mui/icons-material/School';
import WcIcon from '@mui/icons-material/Wc';
import CloseIcon from '@mui/icons-material/Close';

import HelpOutLineIcon from '@mui/icons-material/HelpOutline';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';

import ReceiptIcon from '@mui/icons-material/Receipt';
import SavingsIcon from '@mui/icons-material/Savings';
import { NumericFormat } from 'react-number-format';
import { PropTypes } from 'prop-types';

function CardInfo({
  setLastFiveIncom,
  categoryName,
  amount,
  description,
  date,
}) {
  CardInfo.propTypes = {
    categoryName: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    setLastFiveIncom: PropTypes.func.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.array.isRequired,
  };

  const formatDate = date.join('/');
  //funcion para separa palabras

  const stylesIcon = {
    fontSize: { xs: 32, sm: 40 },
    color: 'green',
  };
  const iconsByTitle = {
    OTROS: <HelpOutLineIcon sx={stylesIcon} />,
    SUELDO: <MonetizationOnIcon sx={stylesIcon} />,
    SUELDO_MENSUAL: <MonetizationOnIcon sx={stylesIcon} />,
    PRESTAMO: <AccountBalanceIcon sx={stylesIcon} />,
    CLIENTES: <AccountCircleIcon sx={stylesIcon} />,
    BONO_EXTRA: <AttachMoneyIcon sx={stylesIcon} />,
    ALIMENTACION: <FastfoodIcon sx={stylesIcon} />,
    VIVIENDA: <HomeIcon sx={stylesIcon} />,
    TRANSPORTE: <CommuteIcon sx={stylesIcon} />,
    ENTRETENIMIENTO: <TheaterComedyIcon sx={stylesIcon} />,
    SALUD_CUIDADO_PERSONAL: <LocalHospitalIcon sx={stylesIcon} />,
    EDUCACION: <SchoolIcon sx={stylesIcon} />,
    VESTIMENTA: <WcIcon sx={stylesIcon} />,
    SERVICIOS: <ReceiptIcon sx={stylesIcon} />,
    AHORRO_INVERSION: <SavingsIcon sx={stylesIcon} />,
    VIAJE_VACACIONES: <FlightIcon sx={stylesIcon} />,
  };
  const icon = iconsByTitle[categoryName];

  //funcion para separa palabras
  const separateWord = (word) => {
    let newWord = '';
    const listSeparate = word.split('_');
    if (listSeparate.length === 2) {
      newWord = listSeparate.join(' ');
      return newWord;
    } else if (listSeparate.length === 1) {
      return word;
    } else {
      const firstPart = listSeparate[0];
      const remainingParts = listSeparate.slice(1);
      newWord = `${firstPart} / ${remainingParts.join(' ')}`;
      return newWord;
    }
  };

  return (
    <Paper
      sx={{
        padding: '0.5rem',
        border: 'solid 2px green',
      }}
    >
      <Box>
        <IconButton
          onClick={() => setLastFiveIncom(true)}
          sx={{
            marginLeft: 'auto',
            display: 'flex',
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          fontSize: '1rem',
        }}
      >
        <Box>{icon}</Box>
        <Typography>{`Fecha: ${formatDate}`}</Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          borderBottom: 'solid 3px green',
          mb: '1rem',
        }}
      >
        <Typography variant='h6' fontSize={'inherit'}>
          {separateWord(categoryName)}
        </Typography>
        <NumericFormat
          value={amount}
          thousandSeparator=','
          displayType='text'
          decimalScale={2}
          fixedDecimalScale={true}
          prefix='$'
          renderText={(value) => <Typography variant='h6'>{value}</Typography>}
        />
      </Box>

      <Box>
        <Typography>Descripción: </Typography>
        <Typography
          variant='body2'
          sx={{
            minHeight: '50px',
          }}
        >
          {description || (
            <small
              style={{
                fontStyle: 'italic',
                display: 'block',
                margin: '0px auto',
                textAlign: 'center',
              }}
            >
              Sin Descripción
            </small>
          )}
        </Typography>
      </Box>
    </Paper>
  );
}

export default CardInfo;
