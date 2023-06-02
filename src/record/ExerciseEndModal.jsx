import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import { set } from 'react-hook-form';

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

  const navigate = useNavigate();
  // 서버로 운동 기록을 보내는 함수
  const sendExerciseRecord = () => {
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
      .post('http://13.209.109.234:5000/exercise_end', exerciseRecord)
      .then(res => {
        console.log(res);
        //navigate('/'); //testpurpose
      })
      .catch(err => {
        console.log(err);
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
          <Modal.Title>운동 완료</Modal.Title>
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
              console.log('서버로 보내용');
              setModalShow(false);
              sendExerciseRecord();
            }}>
            저장
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ExerciseEndModal;
