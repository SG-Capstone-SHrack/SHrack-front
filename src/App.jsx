import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import Home from './Home/Home';
import Signin from './Signin/Signin';
import { authAtom } from './state';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const auth = useRecoilValue(authAtom);
  console.log(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth) {
      navigate('/signin');
    }
  }, [auth, navigate]);
  return (
    <Routes>
      <Route path="/signin" element={<Signin />} />

      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
