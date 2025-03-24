import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Online Store
import Store from './component/store/pages/Home/Store';
import Cart from './component/store/pages/Home/Cart';
import Checkout from './component/store/components/checkout';
import MyOrders from './component/store/components/MyOrders';

// Buyer
import BuyerLogin from './component/Buyer/BuyerLogin';
import BuyerSignup from './component/Buyer/BuyerSignup';
import Profile from './component/Buyer/Profile';

function App() {
  const [cart, setCart] = useState([]);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/Store" element={<Store cart={cart} setCart={setCart} />} />
          <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart} />} />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />         
          <Route path="/my-orders" element={<MyOrders />} />

          <Route path="/" element={<BuyerLogin />} />
          <Route path="/buyersignup" element={<BuyerSignup />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
