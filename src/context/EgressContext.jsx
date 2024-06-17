import { useState } from 'react';
import { createContext, useContext } from 'react';
import { PropTypes } from 'prop-types';
import {
  addExpenses,
  deleteExpenses,
  getExpenses,
  getFilteredExpenses,
} from '../API/egress';
import { useUser } from './UserContext';
import fakeEgressData from '../helpers/fakeEgressData.json';

const EgressContext = createContext();

export const useEgress = () => {
  const context = useContext(EgressContext);
  if (!context) {
    throw new Error('useUser must be used within a EgressProvider');
  }
  return context;
};

export function EgressProvider({ children }) {
  EgressProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  const [newExpense, setNewExpense] = useState([]);
  const [deleteExpense, setDelExpense] = useState([]);
  const [expenses, setExpenses] = useState(fakeEgressData);

  const { setUserData, userData } = useUser();

  const allExpenses = async () => {
    try {
      const res = await getExpenses(userData?.idUser);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const allFilteredExpenses = async (id, filters) => {
    try {
      const res = await getFilteredExpenses(id, filters);
      return res;
    } catch (error) {
      return error;
    }
  };

  const addNewGasto = async (expense) => {
    try {
      const res = await addExpenses(expense);
      setNewExpense(res);
      setExpenses((prev) => [...prev, res.data]);
      setUserData((prev) => ({
        ...prev,
        totalIncome: prev.totalIncome - res.data.amount,
      }));
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const delExpense = async (id) => {
    try {
      const res = await deleteExpenses(id);
      setDelExpense(res);
      if (res.status === 200) {
        const newData = expenses.filter((expense) => expense.idEgress !== id);
        setExpenses(newData);

        const amountOfExpenseToDelete = expenses.find(
          (expense) => expense.idEgress === id,
        ).amount;

        setUserData((prev) => ({
          ...prev,
          totalIncome: prev.totalIncome + amountOfExpenseToDelete,
        }));
      }
      return res;
    } catch (error) {
      return error;
    }
  };

  return (
    <EgressContext.Provider
      value={{
        expenses,
        setExpenses,
        allExpenses,
        allFilteredExpenses,
        addNewGasto,
        delExpense,
        newExpense,
        deleteExpense,
      }}
    >
      {children}
    </EgressContext.Provider>
  );
}
