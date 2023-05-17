import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authAtom } from '../state';

const PrivateRoute = ({ path, element }) => {
  const auth = useRecoilValue(authAtom);
  //로그인 여부에 따라 페이지 이동
  return auth ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
