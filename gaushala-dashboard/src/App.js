import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import Dashboard from "./components/pages/Dashboard";
import OrderHistory from "./components/pages/OrderHistory";
import TodayOrders from "./components/pages/TodayOrders";
import MilkHistory from "./components/pages/MilkHistory";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/total-orders" element={<TodayOrders />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/milk-history" element={<MilkHistory />} />
      </Routes>
    </Router>
  );
};

export default App;
