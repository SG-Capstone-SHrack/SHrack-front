import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  Button,
  Form,
  Container,
  FloatingLabel,
  Alert,
  Modal,
} from 'react-bootstrap';

function ExerciseStartModal({isModalShow, setModalShow}) {
  const [exerciseType, setExerciseType] = useState('');
  const [exerciseGoal, setExerciseGoal] = useState('');
  const [goalType, setGoalType] = useState('');
  return (
    <div>
      <Modal
        show={isModalShow}
        onHide={() => setModalShow(false)}
        backdrop="static"
        keyboard={false}
        centered>
        <Modal.Header closeButton>
          <Modal.Title>운동 시작</Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
      </Modal>
    </div>
  );
}

export default ExerciseStartModal;
