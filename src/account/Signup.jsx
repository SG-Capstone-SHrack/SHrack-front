import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import {
  Button,
  Form,
  Container,
  FloatingLabel,
  Alert,
  Card,
  Row,
  Col,
  Navbar,
} from 'react-bootstrap';

function Signup() {
  // 회원가입 정보
  const [id, setId] = useState('');
  const [isIdValid, setIsIdValid] = useState(false);
  useEffect(() => {
    // id validation check
    if (id === '') {
      setIsIdValid(false);
    } else {
      setIsIdValid(true);
    }
  }, [id]);

  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  useEffect(() => {
    // password validation check
    if (password === '') {
      setIsIdValid(false);
    }
  }, [password]);

  const [passwordCheck, setPasswordCheck] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [birth, setBirth] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    console.log(gender, birth);
  }, [gender, birth]);

  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = e => {
    if (
      // validation check
      true
    ) {
      e.preventDefault();
      axios
        .post('http://13.209.109.234:5000/signup', {
          //json 형식으로 서버에 전송
          id: id,
          password: password,
          name: name,
          gender: gender,
          birthdate: '2000-01-10',
          height: height,
          weight: weight,
        })
        .then(res => {
          console.log(res);
          //window.location.href = '/';
          //Todo:  회원가입 완료 메세지를 보여주는 부분 추가
        })
        .catch(err => {
          console.log(err);
          console.log('hihi error입니다'); //testp
        });
    }
    return;
  };
  return (
    <Container>
      <Navbar sticky="top" bg="light" expand="lg">
        <Navbar.Brand href="#home">SHRACK</Navbar.Brand>
        <Navbar.Text className="mr-auto">회원가입</Navbar.Text>
      </Navbar>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="id">
          <FloatingLabel controlId="id" label="아이디" className="mb-3">
            <Form.Control
              type="ID"
              placeholder="아이디"
              onChange={e => setId(e.target.value)}
              isInvalid={!isIdValid}
            />
            <Form.Control.Feedback type="invalid">
              아이디를 입력해주세요.{' '}
            </Form.Control.Feedback>
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
        <Form.Group className="mb-3" controlId="id">
          <FloatingLabel controlId="name" label="이름" className="mb-3">
            <Form.Control
              type="name"
              placeholder="이름"
              onChange={e => setName(e.target.value)}
            />
          </FloatingLabel>
        </Form.Group>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="height">
              <FloatingLabel controlId="height" label="키(cm)" className="mb-3">
                <Form.Control
                  type="number"
                  placeholder="키(cm)"
                  onChange={e => setHeight(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="weight">
              <FloatingLabel
                controlId="weight"
                label="몸무게(kg)"
                className="mb-3">
                <Form.Control
                  type="number"
                  placeholder="몸무게(kg)"
                  onChange={e => setWeight(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card style={{ height: '100%' }}>
              <Card.Body>
                <Form.Group controlId="gender">
                  <Form.Label>성별</Form.Label>
                  <div>
                    <Form.Check
                      inline
                      type="radio"
                      label="남"
                      name="gender-male"
                      value="M"
                      checked={gender === 'M'}
                      onChange={e => setGender(e.target.value)}
                    />
                    <Form.Check
                      inline
                      type="radio"
                      label="여"
                      name="gender-female"
                      value="F"
                      checked={gender === 'F'}
                      onChange={e => setGender(e.target.value)}
                    />
                  </div>
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ height: '100%' }}>
              <Card.Body>
                <Form.Group controlId="birthdate">
                  <Form.Label>생년월일</Form.Label>
                  <Form.Control
                    type="date"
                    value={birth}
                    onChange={e => setBirth(e.target.value)}
                  />
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <br />
        <Row>
          <Col className="d-flex justify-content-center align-items-center">
            <Button size="lg" variant="primary" type="signIn">
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
