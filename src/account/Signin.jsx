import React from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authAtom } from '../state';
import { Button, Form } from 'react-bootstrap';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

function Signin() {
  const validationSchema = yup.object().shape({
    signInId: yup.string().required('아이디를 입력해주세요.'),
    signInPassword: yup.string().required('비밀번호를 입력해주세요.'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(validationSchema),
  });

  const auth = useRecoilValue(authAtom);
  const navigate = useNavigate();

  const onSubmit = () => {
    console.log('로그인');
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="signInId">
        <Form.Label>아이디</Form.Label>
        <Form.Control type="ID" placeholder="아이디" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="signInPassword">
        <Form.Label>비밀번호</Form.Label>
        <Form.Control type="password" placeholder="비밀번호" />
      </Form.Group>

      <Button variant="primary" type="signIn" onClick={onSubmit}>
        로그인
      </Button>
      <Link to="/signup">
        <Button variant="primary" type="signUp">
          회원가입
        </Button>
      </Link>
    </Form>
  );
}

export default Signin;
