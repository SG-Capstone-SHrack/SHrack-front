import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './Home/Home';
import Signin from './account/Signin';
import Signup from './account/Signup';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  //const auth = useRecoilValue(authAtom);
  // localStorage로부터 auth 정보를 가져온다.
  const auth = localStorage.getItem('auth');
  console.log(auth);

  return (
    <Routes>
      <Route exact path="/" element={auth ? <Home /> : <Signin />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
