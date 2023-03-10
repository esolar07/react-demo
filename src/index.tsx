import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { HashRouter } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
axios.defaults.baseURL = "https://nodejs-demo-6g5p.onrender.com/";
// axios.defaults.baseURL = "http://localhost:3001";
axios.defaults.headers.common['Authorization'] = 'BEARER TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <HashRouter>
      <App />
  </HashRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
