import React from 'react';
import { createRoot } from 'react-dom/client';
import './reset.css';
// import './global.css';
import fooListFn from './components/foo-list';
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';

const FooList = fooListFn();
const container =
  document.getElementById('app') || document.createElement('div');
container.id = 'app';
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Router>
      <Routes></Routes>
    </Router>
  </React.StrictMode>
);
