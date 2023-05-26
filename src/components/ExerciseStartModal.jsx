import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Button,
  Form,
  Container,
  FloatingLabel,
  Alert,
  Modal,
} from 'react-bootstrap';

function ExerciseStartModal({ isModalShow, setModalShow }) {
  const [exerciseType, setExerciseType] = useState('');
  const [exerciseGoal, setExerciseGoal] = useState('');
  const history = useNavigate();

  const handleModalSubmit = () => { //버튼 누르면 녹화 페이지로 데이터 넘기도록 => 추후 수정 예정
    history.push('/녹화 페이지', { exerciseType, exerciseGoal });
    setModalShow(false);
  };

  const yourExercisetypes = () => { //드롭다운 메뉴 구현
    const exampleExerciseTypes = ['Push-up', 'Squat']; //운동 종류 임시 데이터 => 추후 수정 예정
    return exampleExerciseTypes.map((type, index) => (
      <option key={index} value={type}>
        {type}
      </option>
    ));
  };
  const yourExercisegoals = () => {
    const goals = Array.from({ length: 30 }, (_, index) => index + 1);  //운동 횟수 임시 데이터 => 추후 수정 예정
    return goals.map((goal, index) => (
      <option key={index} value={goal}>
        {goal}
      </option>
    ));
  };

  return (
    <div>
      <Modal
        show={isModalShow}
        onHide={() => setModalShow(false)}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>운동 시작</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="exerciseType">
              <Form.Label>운동 종류 선택</Form.Label>
              <Form.Control
                as="select"
                value={exerciseType}
                onChange={(e) => setExerciseType(e.target.value)}
              >
                <option value="">종류를 선택하세요</option>
                {yourExercisetypes()}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="exerciseGoal">
              <Form.Label>운동 목표</Form.Label>
              <Form.Control
                as="select"
                value={exerciseGoal}
                onChange={(e) => setExerciseGoal(e.target.value)}
              >
                <option value="">횟수를 선택하세요</option>
                {yourExercisegoals()}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleModalSubmit}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ExerciseStartModal;
