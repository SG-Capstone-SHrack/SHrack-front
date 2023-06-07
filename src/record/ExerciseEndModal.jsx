import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import Loader from '../components/Loader';

function ExerciseEndModal({
  isModalShow,
  setModalShow,
  exerciseType,
  exerciseGoal,
  exerciseDirection,
  exerciseMass,
  startTime,
  count,
}) {
  const userId = useRef('');
  const endtime = useRef('');
  useEffect(() => {
    userId.current = localStorage.getItem('auth');
    endtime.current = new Date();
  }, []);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  // 서버로 운동 기록을 보내는 함수
  const sendExerciseRecord = () => {
    setIsLoading(true);
    const exerciseRecord = {
      id: userId.current,
      //date는 startTime에서 yyyy-mm-dd만 추출
      date: startTime.current.toISOString().slice(0, 10),
      // start_time은 startTime에서 hh-mm-ss만 추출
      start_time: startTime.current.toISOString().slice(11, 19),
      // end_time은 endtime에서 hh-mm-ss만 추출
      end_time: endtime.current.toISOString().slice(11, 19),
      // exercise_time은 endTime - startTime을 hh-mm-ss로 변환
      exercise_time: new Date(endtime.current - startTime.current)
        .toISOString()
        .slice(11, 19),
      exercise_name: exerciseType,
      // mass가 0일 경우 null로, 그 외는 int로 변환
      mass: exerciseMass === 0 ? null : parseInt(exerciseMass),
      count: parseInt(count),
      aim_set: 1, //test
      exercised_set: 1, //test
    };

    // 서버로 보내는 코드
    axios
      .post('https://shrack.p-e.kr/exercise_end', exerciseRecord)
      .then(res => {
        console.log(res);
        // 메인 페이지로 이동
        window.location.href = process.env.PUBLIC_URL;
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
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
          <Modal.Title>운동이 완료되었습니다. </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>운동 종류: {exerciseType}</p>
          <p>총 횟수 : {count}</p>
          <p>운동 무게: {exerciseMass}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setModalShow(false);
            }}>
            취소
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              console.log('서버로 전송');
              setModalShow(false);
              sendExerciseRecord();
            }}>
            저장
          </Button>
        </Modal.Footer>
      </Modal>
      {isLoading && <Loader />}
    </div>
  );
}

export default ExerciseEndModal;
