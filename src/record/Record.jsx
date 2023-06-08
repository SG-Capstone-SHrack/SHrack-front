import React from 'react';
import { useEffect, useState, useRef } from 'react';
import {
  Button,
  Container,
  Row,
  Col,
  Modal,
  Navbar,
  ProgressBar,
} from 'react-bootstrap';
import style from './Record.module.css';
import CameraComponent from './Camera';
import ExerciseEndModal from './ExerciseEndModal';

import { useLocation } from 'react-router-dom';

function Record() {
  // ExerciseStartModal로부터 정보 받아옴
  const location = useLocation();
  const { exerciseType, exerciseGoal, exerciseDirection, exerciseMass } =
    location.state;

  // count를 위한 상태
  const [count, setCount] = useState(0);

  const [time, setTime] = useState(0);

  // camera가 존재하고 권한이 있는지 확인하는 변수
  const [hasPermission, setHasPermission] = useState(null);
  const startTime = useRef(null);
  useEffect(() => {
    startTime.current = new Date();
    console.log(startTime.current);
  }, []);

  // hasPermission이 true가 되면 1초마다 time이 1씩 증가
  useEffect(() => {
    if (hasPermission) {
      // startTime에 현재 시간 저장

      const interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [hasPermission]);

  // 운동이 끝났는지 확인하는 state
  // 목표 횟수를 달성하거나, 종료 버튼을 누르면 true로 바뀜
  const [isExerciseEnd, setIsExerciseEnd] = useState(false);
  // count가 exerciseGoal과 같아지면 isExerciseEnd를 true로 바꾸고, setShowModal을 true로 바꿈
  useEffect(() => {
    if (count === exerciseGoal) {
      setIsExerciseEnd(true);
      setShowModal(true);
    }
  }, [count, exerciseGoal]);

  // 운동 완료 Modal
  const [showModal, setShowModal] = useState(false);
  const handleModalOpen = () => {
    setShowModal(true);
  };

  return (
    <div>
      <Navbar bg="primary" variant="dark" expand="xs" fluid>
        <Container>
          <Navbar.Brand>SHrack - 운동 기록 중</Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <Row className="justify-content-center">
          <div className={style.item_camera}>
            <CameraComponent
              count={count}
              setCount={setCount}
              hasPermission={hasPermission}
              setHasPermission={setHasPermission}
              exerciseType={exerciseType}
              exerciseGoal={exerciseGoal}
              exerciseDirection={exerciseDirection}
              exerciseMass={exerciseMass}
              isExerciseEnd={isExerciseEnd}
            />
          </div>
        </Row>

        <div className={style.item} style={{ padding: '0.5vh' }}>
          <div>
            <ProgressBar
              animated
              now={(count / exerciseGoal) * 100}></ProgressBar>
            <h2>
              {count} / {exerciseGoal}
            </h2>
          </div>
          <div>
            <div>
              {parseInt(time / 60)
                .toString()
                .padStart(2, '0')}{' '}
              : {(time % 60).toString().padStart(2, '0')}
            </div>
          </div>
          <div className="d-grid gap-2">
            <Button onClick={handleModalOpen} style={{ fontSize: '1.25rem' }}>
              운동 종료하기
            </Button>
          </div>
        </div>
      </Container>
      <ExerciseEndModal
        isModalShow={showModal}
        setModalShow={setShowModal}
        count={count}
        exerciseType={exerciseType}
        exerciseGoal={exerciseGoal}
        exerciseMass={exerciseMass}
        startTime={startTime}
      />
    </div>
  );
}

export default Record;
