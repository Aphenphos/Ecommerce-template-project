import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/reset.css';
import authFn from './components/Auth/Auth';
import adminFn from './components/Admin/Admin';
// import './global.css';
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
const Admin = adminFn();
const Auth = authFn();
const container =
  document.getElementById('app') || document.createElement('div');
container.id = 'app';
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="auth" element={<Auth />}></Route>
        <Route path="admin" element={<Admin />}></Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
