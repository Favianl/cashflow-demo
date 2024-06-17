import { Box, Button, CircularProgress, Paper } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CardInfoAditional from './CardInfoAditional';
import 'animate.css';
import InfoIcon from '@mui/icons-material/Info';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect, useRef, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import TotalAmountHome from './TotalAmountHome';
import { PropTypes } from 'prop-types';
import { useEgress } from '../../../context/EgressContext';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseByCategory = ({ handleOpen }) => {
  ExpenseByCategory.propTypes = {
    handleOpen: PropTypes.func.isRequired,
  };

  const { expenses } = useEgress();

  const [viewInfo, setViewInfo] = useState(true);

  const [pieData, setPieData] = useState(null);

  const [showLegend, setShowLegend] = useState(false);
  const pieRef = useRef(null);

  // Calcula el total de gastos
  const totalGastos = expenses.reduce((acc, item) => acc + item.amount, 0);

  const calculatePorcentajes = () => {
    const porcentajes = [];

    // Calcular el total de gastos
    const totalGastos = expenses.reduce((acc, item) => acc + item.amount, 0);

    const uniqueCategories = [
      ...new Set(expenses.map((expense) => expense.categoryName)),
    ];

    // Recorre las categorías únicas
    uniqueCategories.forEach((category) => {
      // Filtra los gastos correspondientes a la categoría
      const gastosCategoria = expenses.filter(
        (expense) => expense.categoryName === category,
      );

      // Suma los gastos de la categoría
      const totalGastosCategoria = gastosCategoria.reduce(
        (acc, item) => acc + item.amount,
        0,
      );

      // Calcula el porcentaje en función del total de gastos
      const porcentaje = (totalGastosCategoria / totalGastos) * 100;

      // Almacena el porcentaje en el arreglo de porcentajes
      porcentajes.push(porcentaje);
    });

    return porcentajes;
  };

  const colors = [
    {
      color: '#e35db6',
    },
    {
      color: '#3e5eb0',
    },
    {
      color: '#216e27',
    },
    {
      color: '#c4b24d',
    },
    {
      color: '#9749c4',
    },
    {
      color: '#b06c38',
    },
    {
      color: '#47baba',
    },
    {
      color: '#4bbd6d',
    },
    {
      color: '#7666d4',
    },
    {
      color: '#858282',
    },
    {
      color: '#a13232',
    },
  ];

  useEffect(() => {
    const uniqueCategories = [
      ...new Set(expenses.map((expense) => expense.categoryName)),
    ];

    const categories = uniqueCategories.map((category) => category);

    const data = {
      labels: categories,
      datasets: [
        {
          label: '%',
          data: calculatePorcentajes(),
          backgroundColor: colors.map((color) => color.color),
          borderColor: 'black',
          borderWidth: 2,
        },
      ],
    };

    setPieData(data);
  }, [expenses]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (pieRef.current && !pieRef.current.contains(e.target)) {
        setShowLegend(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  if (!pieData) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  return (
    <Paper>
      <Box
        sx={{
          display: 'flex',
          gap: '1rem',
          p: '10px',
        }}
      >
        <Button
          onClick={() => handleOpen('GASTO')}
          type='button'
          fullWidth
          variant='contained'
          sx={{
            bgcolor: '#00796B',
            '&:hover': { bgcolor: '#006B5B' },
          }}
        >
          Añadir Gasto
        </Button>

        <IconButton color='primary' onClick={() => setViewInfo(false)}>
          <InfoIcon />
        </IconButton>
      </Box>

      <Box>
        {viewInfo ? (
          <Box
            ref={pieRef}
            sx={
              expenses.length < 1
                ? {
                    position: 'relative',
                    '&:before': {
                      border: 'solid 2px rgba(0,0,0,0.3)',
                      content: '"No hay Gastos"',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontStyle: 'italic',
                      color: 'rgba(0,0,0,0.3)',
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      width: 'calc(100% - 20px)',
                      height: 'calc(100% - 20px)',
                      borderRadius: '50%',
                    },
                  }
                : {}
            }
          >
            <Pie
              style={{ padding: '10px' }}
              onClick={() => setShowLegend(true)}
              data={pieData}
              options={{
                plugins: {
                  legend: {
                    display: showLegend,
                    position: 'right',
                  },
                },
              }}
            />
          </Box>
        ) : (
          <Box
            sx={{
              minWidth: { lg: '320px' },
            }}
            className='animate__animated  animate__backInDown'
          >
            <CardInfoAditional
              text={
                'Este gráfico muestra cómo se compone tu Total de Gastos indicando el porcentaje que representa cada categoría dentro del mismo. Además, en la sección inferior puedes hacer clic en los rectángulos correspondientes a las categorías cuyo porcentaje no quieras visualizar en el gráfico.'
              }
              setView={setViewInfo}
            />
          </Box>
        )}

        <Box padding='1rem'>
          <TotalAmountHome
            text={'Total de Gastos'}
            total={totalGastos}
            color={'red'}
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default ExpenseByCategory;
