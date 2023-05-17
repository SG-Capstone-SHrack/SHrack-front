import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import { useRecoilValue } from 'recoil';
// import PrivateRoute from './components/PrivateRoute';
import Home from './Home/Home';
import Login from './account/Login';
import { authAtom } from './state';
import './App.css';

function App() {
  const auth = useRecoilValue(authAtom);
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth) {
      navigate('/login');
    }
  }, [auth, navigate]);
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      {/* <PrivateRoute exact path="/" element={<Home />} /> */}
    </Routes>
  );
}

export default App;
