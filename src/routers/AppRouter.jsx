import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import StatisticsPage from '../pages/StatisticsPage';
import HistoryPage from '../pages/HistoryPage';
import NotFoundPage from '../pages/NotFoundPage';
import Layout from '../modules/Layout';
import LandingPage from '../pages/LandingPage';
import AccountPage from '../pages/AccountPage';
import SavingsPage from '../pages/SavingsPage';

function AppRouter() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/statistics' element={<StatisticsPage />} />
          <Route path='/savings' element={<SavingsPage />} />
          <Route path='/financialHistory' element={<HistoryPage />} />
          <Route path='/account' element={<AccountPage />} />

          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default AppRouter;
