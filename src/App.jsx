import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import Home from './Home/Home';
import Signin from './account/Signin';
import Signup from './account/Signup';
import { authAtom } from './state';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const auth = useRecoilValue(authAtom);
  console.log(auth);
  const navigate = useNavigate();

  return (
    <Routes>
      <Route exact path="/" element={auth ? <Home /> : <Signin />} /> 
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
