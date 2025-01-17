import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Payments from './components/Payments/Payments';
import ManagePayments from './components/Payments/ManagePayments';
import AddPayment from './components/Payments/AddPayment';
import PaymentHistory from './components/Payments/PaymentHistory';
import Rewards from './components/Rewards/Rewards';
import MyRewards from './components/Rewards/MyRewards';
import Profile from './components/Profile';

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/payments" element={<Payments />}>
            <Route index element={<ManagePayments />} />
            <Route path="manage" element={<ManagePayments />} />
            <Route path="add" element={<AddPayment />} />
            <Route path="history" element={<PaymentHistory />} />
          </Route>
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/rewards/my" element={<MyRewards />} />
          <Route path="/profile" element={<Profile />}/>
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
