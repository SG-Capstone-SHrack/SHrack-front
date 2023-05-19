import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import Home from './Home/Home';
import Signin from './account/Signin';
import Signup from './account/Signup';
import { authAtom } from './state';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  //const auth = useRecoilValue(authAtom);
  const [auth, setAuth] = useRecoilState(authAtom);

  return (
    <Routes>
      <Route exact path="/" element={auth ? <Home /> : <Signin />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
