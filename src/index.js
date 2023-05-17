import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import './index.css';
import App from './App';
import { RecoilRoot } from 'recoil';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <RecoilRoot>
    <Router>
      <App />
    </Router>
  </RecoilRoot>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

