import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:3001";
axios.defaults.headers.common['Authorization'] = 'BEARER TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

ReactDOM.render(
    <Router>
            <App />
    </Router>,
    document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
