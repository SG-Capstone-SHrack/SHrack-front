import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
  const history = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isAlert, setIsAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!id || !password) {
      setIsAlert(true);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        'http://13.209.109.234:5000/login',
        JSON.stringify({ id, password }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const userId = response.data.id;
      localStorage.setItem('auth', response.data.key);
      history.push(`/home/${userId}`);
    } catch (error) {
      setIsAlert(true);
      console.log('Error:', error);
    } finally {
      setIsLoading(false);
    }
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
