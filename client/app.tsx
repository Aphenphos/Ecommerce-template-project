import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/reset.css';
import authFn from './components/Auth/Auth';
import adminFn from './components/Admin/Admin';
import vendorFn from './components/Vendor/Vendor';
import headerFn from './components/Header/Header';
import mainFn from './components/Main/Main';
import checkoutFn from './components/Checkout/Checkout';
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import { UserProvider } from './context/useUser';
import { CartProvider } from './context/useCart';
import { ItemProvider } from './context/useItem';
const Admin = adminFn();
const Auth = authFn();
const Vendor = vendorFn();
const Header = headerFn();
const Main = mainFn();
const Checkout = checkoutFn();
const container =
  document.getElementById('app') || document.createElement('div');
container.id = 'app';
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Router>
      <UserProvider>
        <ItemProvider>
          <CartProvider>
            <Header />
            <Routes>
              <Route path="" element={<Main />}></Route>
              <Route path="auth/:type" element={<Auth />}></Route>
              <Route path="admin" element={<Admin />}></Route>
              <Route path="vendor" element={<Vendor />}></Route>
              <Route path="checkout" element={<Checkout />}></Route>
            </Routes>
          </CartProvider>
        </ItemProvider>
      </UserProvider>
    </Router>
  </React.StrictMode>
);
