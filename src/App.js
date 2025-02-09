import React, { useEffect, useState } from 'react';
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
import RewardsCatalogue from './components/Rewards/RewardsCatalogue';
import MyRewards from './components/Rewards/MyRewards';
import Profile from './components/Profile';

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const userId = localStorage.getItem("userId");

  // Check if user is admin
  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:8087/auth/${userId}/is-admin`)
        .then((response) => response.json())
        .then((data) => {
          setIsAdmin(data);
          if (data && location.pathname === "/") {
            navigate("/admin/add-bill"); // Redirect Admin to AddBill only on initial login
          }
        })
        .catch((error) => console.error("Error checking admin status:", error));
    }
  }, [userId, navigate, location.pathname]);

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

          {/* Payments Section */}
          <Route path="/payments" element={isAuthenticated ? <Payments isAdmin={isAdmin} /> : <Login />}>
            {isAdmin ? (
              <Route path="add-bill" element={<AddBill />} />
            ) : (
              <>
                <Route index element={<ManagePayments />} />
                <Route path="manage" element={<ManagePayments />} />
                <Route path="add" element={<AddPayment />} />
                <Route path="history" element={<PaymentHistory />} />
              </>
            )}
          </Route>

          {/* Rewards */}
          <Route path="/rewards" element={isAuthenticated ? <Rewards /> : <Login />}>
            <Route index element={<RewardsCatalogue />} />
            <Route path="my" element={<MyRewards />} />
          </Route>

          {/* Profile Page - Now accessible to Admins too */}
          <Route path="/profile" element={isAuthenticated ? <Profile /> : <Login />} />
          
          {/* Admin-Only Route */}
          <Route path="/admin/add-bill" element={isAdmin ? <AddBill /> : <Dashboard />} />
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
