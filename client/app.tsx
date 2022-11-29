import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/reset.css';
import authFn from './components/Auth/Auth';
import adminFn from './components/Admin/Admin';
import vendorFn from './components/Vendor/Vendor';
import headerFn from './components/Header/Header';
import mainFn from './components/Main/Main';
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import { UserProvider } from './context/useUser';
const Admin = adminFn();
const Auth = authFn();
const Vendor = vendorFn();
const Header = headerFn();
const Main = mainFn();
const container =
  document.getElementById('app') || document.createElement('div');
container.id = 'app';
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Router>
      <UserProvider>
        <Header />
        <Routes>
          <Route path="" element={<Main />}></Route>
          <Route path="auth/:type" element={<Auth />}></Route>
          <Route path="admin" element={<Admin />}></Route>
          <Route path="vendor" element={<Vendor />}></Route>
        </Routes>
      </UserProvider>
    </Router>
  </React.StrictMode>
);
