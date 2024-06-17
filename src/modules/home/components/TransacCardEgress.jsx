import { Box, Typography } from '@mui/material';

import FastfoodIcon from '@mui/icons-material/Fastfood';
import HomeIcon from '@mui/icons-material/Home';
import CommuteIcon from '@mui/icons-material/Commute';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SchoolIcon from '@mui/icons-material/School';
import WcIcon from '@mui/icons-material/Wc';
import FlightIcon from '@mui/icons-material/Flight';
import HelpOutLineIcon from '@mui/icons-material/HelpOutline';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import Info from '@mui/icons-material/Info';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SavingsIcon from '@mui/icons-material/Savings';
import { NumericFormat } from 'react-number-format';
import { PropTypes } from 'prop-types';

function TransacCardEgress({
  categoryName,
  amount,
  setLastFiveEgress,
  info,
  setInfoCard,
}) {
  TransacCardEgress.propTypes = {
    categoryName: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    setLastFiveEgress: PropTypes.func.isRequired,
    info: PropTypes.object.isRequired,
    setInfoCard: PropTypes.func.isRequired,
  };

  const iconsByTitle = {
    ALIMENTACION: <FastfoodIcon fontSize='inherit' />,
    VIVIENDA: <HomeIcon fontSize='inherit' />,
    TRANSPORTE: <CommuteIcon fontSize='inherit' />,
    ENTRETENIMIENTO: <TheaterComedyIcon fontSize='inherit' />,
    SALUD_CUIDADO_PERSONAL: <LocalHospitalIcon fontSize='inherit' />,
    EDUCACION: <SchoolIcon fontSize='inherit' />,
    VESTIMENTA: <WcIcon fontSize='inherit' />,
    SERVICIOS: <ReceiptIcon fontSize='inherit' />,
    AHORRO_INVERSION: <SavingsIcon fontSize='inherit' />,
    VIAJE_VACACIONES: <FlightIcon fontSize='inherit' />,
    OTROS: <HelpOutLineIcon fontSize='inherit' />,
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

  const handlerBtn = (e) => {
    e.preventDefault();
    setLastFiveEgress(false);
    setInfoCard(info);
  };
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: '1rem',
        borderBottom: 'solid 1px white',
        pb: '3px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <Typography fontSize='1rem'>{icon}</Typography>
        <Typography fontSize='0.7rem'>{separateWord(categoryName)}</Typography>
      </Box>
      <Box
        sx={{
          fontSize: '0.8rem',
          textAlign: 'right',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <NumericFormat
          value={amount}
          thousandSeparator=','
          displayType='text'
          decimalScale={2}
          fixedDecimalScale={true}
          prefix='$'
          renderText={(value) => (
            <Typography fontSize='inherit'>{value}</Typography>
          )}
        />

        <Box
          onClick={(e) => handlerBtn(e)}
          sx={{
            fontSize: '1rem',
            background: '#0a574e',
            '&:hover': { background: '#006666' },
            paddingY: '3px',
            paddingX: { xs: '5px', sm: '8px' },
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            borderRadius: '3px',
          }}
        >
          <Info color='white' fontSize='inherit' />
        </Box>
      </Box>
    </Box>
  );
}

export default TransacCardEgress;
