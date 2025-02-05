import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import Payments from './components/Payments/Payments';
import ManagePayments from './components/Payments/ManagePayments';
import AddPayment from './components/Payments/AddPayment';
import AddBill from "./components/Payments/AddBill";
import PaymentHistory from './components/Payments/PaymentHistory';
import Rewards from './components/Rewards/Rewards';
import MyRewards from './components/Rewards/MyRewards';
import Profile from './components/Profile';

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const isAuthenticated = localStorage.getItem("isAuthenticated"); // Check if user is logged in

  useEffect(() => {
    if (!isAuthenticated && location.pathname !== "/login" && location.pathname !== "/register") {
      navigate("/login"); // Redirect to login if not authenticated
    }
  }, [isAuthenticated, location, navigate]);

  const hideHeader = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="app-container">
      {!hideHeader && <Header />}
      <main className="content">
        <Routes>
          <Route path="/" element={isAuthenticated ? <Dashboard /> : <Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/payments" element={isAuthenticated ? <Payments /> : <Login />}>
            <Route index element={<ManagePayments />} />
            <Route path="manage" element={<ManagePayments />} />
            <Route path="add" element={<AddPayment />} />
            <Route path="add-bill" element={<AddBill />} />
            <Route path="history" element={<PaymentHistory />} />
          </Route>
          <Route path="/rewards" element={isAuthenticated ? <Rewards /> : <Login />} />
          <Route path="/rewards/my" element={isAuthenticated ? <MyRewards /> : <Login />} />
          <Route path="/profile" element={isAuthenticated ? <Profile /> : <Login />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;
