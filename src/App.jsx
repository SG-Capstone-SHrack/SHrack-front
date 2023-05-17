import React, { useEffect } from 'react';
import { Route, Routes, useNavigate, Router } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import PrivateRoute from './components/PrivateRoute';
import Home from './Home/Home';
import { authAtom } from './state';
import './App.css';

function App() {
  const auth = useRecoilValue(authAtom);
  return (
    <div className="App">
      <Router>
        <Routes>
          <PrivateRoute exact path="/" component={Home} />

          <Route>account</Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
