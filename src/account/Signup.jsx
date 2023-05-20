import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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

function Signup() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isAlert, setIsAlert] = useState(false);
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
      return;
    }
    console.log('비어있진않음');
    //디버깅을 위해 e.preventDefault() 사용
    //실제 서버에 전송할 때는 e.preventDefault() 삭제
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
      .post('http://13.125.207.72:5000/login', JSON.stringify(data), {
        headers,
      })
      .then(res => {
        console.log(res);

        localStorage.setItem('auth', res.data.key);
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
        <Navbar.Text className="mr-auto">회원가입</Navbar.Text>
      </Navbar>
      <Form>
        <Form.Group className="mb-3" controlId="signInId">
          <FloatingLabel controlId="signInID" label="아이디" className="mb-3">
            <Form.Control
              type="ID"
              placeholder="아이디"
              onChange={e => setId(e.target.value)}
            />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3" controlId="signInPassword">
          <FloatingLabel
            controlId="signInPassword"
            label="비밀번호"
            className="mb-3">
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
            <Button
              size="lg"
              variant="primary"
              type="signIn"
              onClick={onSubmit}>
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
    </Container>
  );
}
export default Signup;
