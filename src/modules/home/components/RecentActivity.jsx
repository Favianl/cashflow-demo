import { useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import TransactionCardIncomes from './TransactionCardIncomes';
import TransacCardEgress from './TransacCardEgress';
import CardInfoIncome from './CardInfoIncome';
import 'animate.css';

import { useIncome } from '../../../context/IncomeContext';
import { useEgress } from '../../../context/EgressContext';
import CardInfoExpenses from './CardInfoExpenses';

function RecentActivity() {
  const { expenses } = useEgress();
  const { incomes } = useIncome();

  const [lastFiveIncom, setLastFiveIncom] = useState(true); //Estado para mostrar los ultimos ingresos
  const [infoCardIncomes, setInfoCardIncomes] = useState(null);
  const [infoCardExpenses, setInfoCardExpenses] = useState(null);
  const [lastFiveEgress, setLastFiveEgress] = useState(true);
  const lastFiveIncomes = incomes.slice(-5).reverse();
  const lastFiveExpenses = expenses.slice(-5).reverse();

  return (
    <Box
      borderRadius={1}
      sx={{
        bgcolor: '#00796b',
        padding: { xs: '0.5rem', sm: '1rem' },
        color: 'white',
      }}
    >
      <Typography
        variant='h5'
        textAlign={'center'}
        sx={{
          paddingY: '10px',
        }}
      >
        Últimos Movimientos
      </Typography>

      <Paper
        elevation={4}
        sx={{
          padding: '1rem',
          bgcolor: '#0f887a',
          color: 'white',
          mb: '1rem',
        }}
      >
        <Typography variant='h6' textAlign={'center'} mb={2}>
          Ingresos
        </Typography>

        {/**Muestra ingresos o la card */}

        {lastFiveIncom && (
          <div
            className='animate__animated  animate__flipInX'
            style={{
              minHeight: '200px',
            }}
          >
            {lastFiveIncomes.length < 1 && (
              <small
                style={{
                  fontStyle: 'italic',
                  display: 'block',
                  margin: '0px auto',
                  textAlign: 'center',
                }}
              >
                No hay gastos
              </small>
            )}
            {lastFiveIncomes?.map((item, index) => (
              <TransactionCardIncomes
                key={index}
                amount={` $${item.amount} `}
                categoryName={item.categoryName}
                description={item.description}
                date={item.date}
                setLastFiveIncom={setLastFiveIncom}
                info={item}
                setInfoCard={setInfoCardIncomes}
              />
            ))}
          </div>
        )}

        {!lastFiveIncom && (
          <div className='animate__animated animate__flipInX'>
            <CardInfoIncome
              setLastFiveIncom={setLastFiveIncom}
              amount={infoCardIncomes?.amount}
              date={infoCardIncomes?.date}
              description={infoCardIncomes?.description}
              categoryName={infoCardIncomes?.categoryName}
            />
          </div>
        )}
      </Paper>

      <Paper
        elevation={4}
        sx={{
          padding: '1rem',
          bgcolor: '#0f887a',
          color: 'white',
        }}
      >
        <Typography variant='h6' textAlign={'center'} mb={2}>
          Gastos
        </Typography>

        {/**se muestran los ultimos 5 gastos o la informacion que contiene */}
        {lastFiveEgress && (
          <div
            className='animate__animated  animate__flipInX'
            style={{
              minHeight: '200px',
            }}
          >
            {lastFiveExpenses.length < 1 && (
              <small
                style={{
                  fontStyle: 'italic',
                  display: 'block',
                  margin: '0px auto',
                  textAlign: 'center',
                }}
              >
                No hay Ingresos
              </small>
            )}
            {lastFiveExpenses?.map((item, index) => (
              <TransacCardEgress
                key={index}
                amount={`-$${item.amount} `}
                categoryName={item.categoryName}
                description={item.description}
                date={item.date}
                setLastFiveEgress={setLastFiveEgress}
                info={item}
                setInfoCard={setInfoCardExpenses}
              />
            ))}
          </div>
        )}

        {!lastFiveEgress && (
          <div className='animate__animated animate__flipInX'>
            <CardInfoExpenses
              setLastFiveExpenses={setLastFiveEgress}
              amount={infoCardExpenses?.amount}
              date={infoCardExpenses?.date}
              description={infoCardExpenses?.description}
              categoryName={infoCardExpenses?.categoryName}
            />
          </div>
        )}
      </Paper>
    </Box>
  );
}

export default RecentActivity;
