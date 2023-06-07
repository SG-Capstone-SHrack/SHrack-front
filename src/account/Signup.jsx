import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Button,
  Form,
  Container,
  FloatingLabel,
  Card,
  Row,
  Col,
  Navbar,
} from 'react-bootstrap';
import Loader from '../components/Loader';

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
      setIsPasswordValid(false);
    } else {
      setIsPasswordValid(true);
    }
  }, [password]);

  const [passwordCheck, setPasswordCheck] = useState('');
  const [isPasswordCheckValid, setIsPasswordCheckValid] = useState(false);
  useEffect(() => {
    // passwordCheck validation check
    if (passwordCheck !== password) {
      setIsPasswordCheckValid(false);
    } else {
      setIsPasswordCheckValid(true);
    }
  }, [passwordCheck, password]);

  const [name, setName] = useState('');
  const [isNameValid, setIsNameValid] = useState(false);
  useEffect(() => {
    // name validation check
    if (name === '') {
      setIsNameValid(false);
    } else {
      setIsNameValid(true);
    }
  }, [name]);

  const [gender, setGender] = useState('M');

  const [height, setHeight] = useState('');
  const [isHeightValid, setIsHeightValid] = useState(false);
  useEffect(() => {
    if (height === '') {
      setIsHeightValid(false);
    } else {
      setIsHeightValid(true);
    }
  }, [height]);

  const [weight, setWeight] = useState('');
  const [isWeightValid, setIsWeightValid] = useState(false);
  useEffect(() => {
    if (weight === '') {
      setIsWeightValid(false);
    } else {
      setIsWeightValid(true);
    }
  }, [weight]);

  const [birth, setBirth] = useState('');
  const [isBirthValid, setIsBirthValid] = useState(false);
  useEffect(() => {
    if (birth === '') {
      setIsBirthValid(false);
    } else {
      setIsBirthValid(true);
    }
  }, [birth]);

  useEffect(() => {
    console.log(gender, birth);
  }, [gender, birth]);

  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = e => {
    if (
      // validation check
      // check every validation states are true
      isIdValid &&
      isPasswordValid &&
      isPasswordCheckValid &&
      isNameValid &&
      isHeightValid &&
      isWeightValid &&
      isBirthValid
    ) {
      e.preventDefault();
      // birthdate format: YYYY-MM-DD (string)
      const birthdate =
        birth.substring(0, 4) + birth.substring(5, 7) + birth.substring(8, 10);
      setIsLoading(true);
      //http://13.209.109.234:5000/signup
      axios
        .post('https://shrack.p-e.kr/signup', {
          //json 형식으로 서버에 전송
          id: id,
          password: password,
          name: name,
          gender: gender,
          birthdate: birthdate,
          height: height,
          weight: weight,
        })
        .then(res => {
          console.log(res);
          alert('회원가입이 완료되었습니다.');
          window.location.href = process.env.PUBLIC_URL;
          //Todo:  회원가입 완료 메세지를 보여주는 부분 추가
        })
        .catch(err => {
          console.log(err);
          console.log('hihi error입니다'); //testp
          alert('회원가입에 실패하였습니다. 잠시 후 다시 시도해주세요.');
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      e.preventDefault();
      console.log('입력 정보 부족');
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
                  isInvalid={!isPasswordValid}
                />
                <Form.Control.Feedback type="invalid">
                  비밀번호를 입력해주세요.{' '}
                </Form.Control.Feedback>
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
                  onChange={e => setPasswordCheck(e.target.value)}
                  isInvalid={!isPasswordCheckValid}
                />
                <Form.Control.Feedback type="invalid">
                  비밀번호가 일치하지 않습니다.{' '}
                </Form.Control.Feedback>
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
              isInvalid={!isNameValid}
            />
            <Form.Control.Feedback type="invalid">
              이름을 입력해주세요.{' '}
            </Form.Control.Feedback>
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
                  isInvalid={!isHeightValid}
                />
                <Form.Control.Feedback type="invalid">
                  키를 입력해주세요.{' '}
                </Form.Control.Feedback>
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
                  isInvalid={!isWeightValid}
                />
                <Form.Control.Feedback type="invalid">
                  몸무게를 입력해주세요.{' '}
                </Form.Control.Feedback>
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
                    isInvalid={!isBirthValid}
                  />
                  <Form.Control.Feedback type="invalid">
                    생년월일을 선택해주세요.{' '}
                  </Form.Control.Feedback>
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
      {isLoading && <Loader />}
    </Container>
  );
}
export default Signup;
