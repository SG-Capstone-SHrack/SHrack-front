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
} from 'react-bootstrap';
import axios from 'axios';

function Signin() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isAlert, setIsAlert] = useState(true);
  useEffect(() => {
    console.log(id, password);
  }, [id, password]);

  // onSubmit -> Id와 Password를 받아서 서버에 전송
  const onSubmit = data => {
    console.log(data);
    // 서버에 전송
  };
  return (
    <Container>
      <h1>SHRACK</h1>
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
