import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  Button,
  Form,
  Container,
  FloatingLabel,
  Alert,
  Row,
  Col,
  Navbar,
} from 'react-bootstrap';
import axios from 'axios';
import Loader from '../components/Loader';

function Signin() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isAlert, setIsAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    console.log(id, password);
  }, [id, password]);

  // onSubmit -> Id와 Password를 받아서 서버에 전송
  const onSubmit = e => {
    //id가 비어있거나  password가 비어있으면 return
    if (!id || !password) {
      e.preventDefault();
      setIsAlert(true);
      setAlertMessage('아이디와 비밀번호를 입력해주세요.');
      return;
    }

    const data = {
      id: id,
      password: password,
    };
    const headers = {
      'Content-Type': 'application/json',
    };
    e.preventDefault();

    //console.log(data);
    // 서버에 전송
    setIsLoading(true);
    axios
      .post('http://13.209.109.234:5000/login', JSON.stringify(data), {
        headers,
      })
      .then(res => {
        e.preventDefault(); //testp
        console.log(res);
        localStorage.setItem('auth', res.data.id);
        console.log(localStorage.getItem('auth'));
        //Todo : 받는거 잘 분석해서 auth에 아이디 넣기
        window.location.href = '/';
      })
      .catch(err => {
        console.log(err);
        setIsAlert(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <Container>
      <Navbar sticky="top" bg="light" expand="lg">
        <Navbar.Brand href="#home">SHRACK</Navbar.Brand>
        <Navbar.Text className="mr-auto">로그인</Navbar.Text>
      </Navbar>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="id">
          <FloatingLabel controlId="id" label="아이디" className="mb-3">
            <Form.Control
              type="ID"
              placeholder="아이디"
              onChange={e => setId(e.target.value)}
            />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <FloatingLabel controlId="password" label="비밀번호" className="mb-3">
            <Form.Control
              type="password"
              placeholder="비밀번호"
              onChange={e => setPassword(e.target.value)}
            />
          </FloatingLabel>
        </Form.Group>
        {isAlert && (
          <Alert variant="warning" onClose={() => setIsAlert(false)}>
            아이디와 비밀번호를 확인해주세요.
          </Alert>
        )}
        <Row>
          <Col className="d-flex justify-content-center align-items-center">
            <Button size="lg" variant="primary" type="signIn">
              로그인
            </Button>
          </Col>
          <Col className="d-flex justify-content-center align-items-center">
            <Link to="/signup">
              <Button size="lg" variant="primary" type="signUp">
                회원가입
              </Button>
            </Link>
          </Col>
        </Row>
      </Form>
      {isLoading && <Loader />}
    </Container>
  );
}

export default Signin;
