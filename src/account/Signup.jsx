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
  // 회원가입 정보
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [birth, setBirth] = useState('');
  const [name, setName] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  return (
    <Container>
      <Navbar sticky="top" bg="light" expand="lg">
        <Navbar.Brand href="#home">SHRACK</Navbar.Brand>
        <Navbar.Text className="mr-auto">회원가입</Navbar.Text>
      </Navbar>
      <Form>
        <Form.Group className="mb-3" controlId="id">
          <FloatingLabel controlId="id" label="아이디" className="mb-3">
            <Form.Control
              type="ID"
              placeholder="아이디"
              onChange={e => setId(e.target.value)}
            />
          </FloatingLabel>
        </Form.Group>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="password">
              <FloatingLabel
                controlId="password"
                label="비밀번호"
                className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="비밀번호"
                  onChange={e => setPassword(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="passwordCheck">
              <FloatingLabel
                controlId="passwordCheck"
                label="비밀번호 확인"
                className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="비밀번호 확인"
                  onChange={e => setPassword(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center align-items-center">
            <Button
              size="lg"
              variant="primary"
              type="signIn"
              onClick={console.log('')}>
              회원가입
            </Button>
          </Col>
          <Col className="d-flex justify-content-center align-items-center">
            <Link to="/">
              <Button size="lg" variant="secondary" type="signUp">
                돌아가기
              </Button>
            </Link>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
export default Signup;
