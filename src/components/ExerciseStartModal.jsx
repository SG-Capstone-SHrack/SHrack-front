import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Form, Alert, Row, Col, Modal } from 'react-bootstrap';

function ExerciseStartModal({ isModalShow, setModalShow }) {
  const navigate = useNavigate();
  const [exerciseType, setExerciseType] = useState('');
  const [exerciseGoal, setExerciseGoal] = useState(0);
  const [exerciseMass, setExerciseMass] = useState(0);
  const [exerciseDirection, setExerciseDirection] = useState('');

  const [isAlert, setIsAlert] = useState(false);

  const handleModalSubmit = () => {
    // exerciseType과 exerciseGoal과 exerciseDirection이 선택되지 않았다면 Alert 출력
    if (exerciseType === '' || exerciseGoal === 0 || exerciseDirection === '') {
      setIsAlert(true);
      return;
    }
    // '/record'로 이동, 이 때 exerciseType, exerciseGoal, exerciseDirection, exerciseMass를 같이 보내줌
    navigate('/record', {
      state: {
        exerciseType: exerciseType,
        exerciseGoal: exerciseGoal,
        exerciseDirection: exerciseDirection,
        exerciseMass: exerciseMass,
      },
    });

    setModalShow(false);
  };

  const yourExercisetypes = () => {
    //드롭다운 메뉴 구현
    const exampleExerciseTypes = ['pushup', 'squat'];
    return exampleExerciseTypes.map((type, index) => {
      let message = '';
      if (type === 'pushup') {
        message = '팔굽혀펴기';
      } else if (type === 'squat') {
        message = '스쿼트';
      }

      return (
        <option key={index} value={type}>
          {message}
        </option>
      );
    });
  };

  return (
    <div>
      <Modal
        show={isModalShow}
        onHide={() => setModalShow(false)}
        backdrop="static"
        keyboard={false}
        centered>
        <Modal.Header closeButton>
          <Modal.Title>운동 시작하기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col>
                <Form.Group controlId="exerciseType">
                  <Form.Label>운동 종류 선택</Form.Label>
                  <Form.Select
                    value={exerciseType}
                    onChange={e => setExerciseType(e.target.value)}>
                    <option value="">종류를 선택하세요</option>
                    {yourExercisetypes()}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                {/* 운동 방향을 left와 right중 선택 */}
                <Form.Group controlId="exerciseDirection">
                  <Form.Label>운동 방향 선택</Form.Label>
                  <Form.Select
                    value={exerciseDirection}
                    onChange={e => setExerciseDirection(e.target.value)}>
                    <option value="">방향을 선택하세요</option>
                    <option value="left">왼쪽</option>
                    <option value="right">오른쪽</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <br />
            <Row>
              <Col>
                <Form.Group controlId="exerciseGoal">
                  <Form.Label>운동 목표(횟수)</Form.Label>
                  <Form.Control
                    as="input"
                    type="number"
                    value={exerciseGoal}
                    min={0}
                    onChange={e => {
                      setExerciseGoal(parseInt(e.target.value));
                    }}></Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="exerciseMass">
                  <Form.Label>운동 중량(kg)</Form.Label>
                  <Form.Control
                    as="input"
                    type="number"
                    value={exerciseMass}
                    min={0}
                    onChange={e => {
                      setExerciseMass(parseInt(e.target.value));
                    }}></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <br />
            <Row>
              {isAlert && (
                <Alert variant="warning">
                  운동 종류와 운동 목표, 방향을 선택해주세요
                </Alert>
              )}
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <br />
          <Button variant="primary" onClick={handleModalSubmit}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ExerciseStartModal;
