import React from 'react';
import { createRoot } from 'react-dom/client';
import ServNowApp from './App.jsx';
import './styles.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode><ServNowApp /></React.StrictMode>
);