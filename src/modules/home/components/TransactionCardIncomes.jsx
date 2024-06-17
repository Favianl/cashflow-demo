import { Box, Typography } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import HelpOutLineIcon from '@mui/icons-material/HelpOutline';
import Info from '@mui/icons-material/Info';
import { NumericFormat } from 'react-number-format';
import { PropTypes } from 'prop-types';

function TransactionCard({
  categoryName,
  amount,
  setLastFiveIncom,
  info,
  setInfoCard,
}) {
  TransactionCard.propTypes = {
    categoryName: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    setLastFiveIncom: PropTypes.func.isRequired,
    info: PropTypes.object.isRequired,
    setInfoCard: PropTypes.func.isRequired,
  };

  const iconsByTitle = {
    PRESTAMO: <AccountBalanceIcon fontSize='inherit' />,
    CLIENTES: <AccountCircleIcon fontSize='inherit' />,
    BONO_EXTRA: <AttachMoneyIcon fontSize='inherit' />,
    SUELDO_MENSUAL: <MonetizationOnIcon fontSize='inherit' />,
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
    setLastFiveIncom(false);
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

export default TransactionCard;
