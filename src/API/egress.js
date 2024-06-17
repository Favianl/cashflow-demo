import axios from './axios';

//Obtener todos los gastos
export const getExpenses = async (userId) =>
  axios.get(`user/${userId}/list/egress`);

//Obtener gastos filtrados
export const getFilteredExpenses = async (userId, filters) =>
  axios.patch(`/user/egress/month/${userId}`, filters);

//Agregar un gasto
export const addExpenses = async (expenses) =>
  axios.post('/user/egress', expenses);

//Eliminar un gasto
export const deleteExpenses = async (id) => axios.delete(`/user/egress/${id}`);
