import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import { useRecoilValue } from 'recoil';
//import PrivateRoute from './components/PrivateRoute';
import Home from './Home/Home';
import { authAtom } from './state';
import './App.css';

function App() {
  //const auth = useRecoilValue(authAtom);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
