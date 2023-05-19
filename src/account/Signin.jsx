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

function Signin() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isAlert, setIsAlert] = useState(false);
  useEffect(() => {
    console.log(id, password);
  }, [id, password]);

  // onSubmit -> Id와 Password를 받아서 서버에 전송
  const onSubmit = (e, data) => {
    //디버깅을 위해 e.preventDefault() 사용
    //실제 서버에 전송할 때는 e.preventDefault() 삭제
    e.preventDefault();
    console.log(data);
    // 서버에 전송
    // axios
    //   .post('http://localhost:8000/api/auth/login/', data)
    //   .then(res => {
    //     console.log(res);
    //     localStorage.setItem('auth', res.data.key);
    //     window.location.href = '/';
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     setIsAlert(true);
    //   });
  };
  return (
    <Container>
      <Navbar sticky="top" bg="light" expand="lg">
        <Navbar.Brand href="#home">SHRACK</Navbar.Brand>
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

export default Signin;
