import React from 'react';
import { useEffect, useState, useRef } from 'react';
import style from './Record.module.css';
import CameraComponent from './Camera';
import Counter from './Counter';
import { useLocation } from 'react-router-dom';

function Record() {
  const location = useLocation();
  const { exerciseType, exerciseGoal, exerciseDirection, exerciseMass } =
    location.state;
  console.log(exerciseType, exerciseGoal, exerciseDirection, exerciseMass);
  const [count, setCount] = useState(0);
  // count 1 증가
  const increaseCount = () => {
    setCount(prevCount => prevCount + 1);
  };

  const [time, setTime] = useState(0);

  // camera가 존재하고 권한이 있는지 확인하는 변수
  const [hasPermission, setHasPermission] = useState(null);
  const startTime = useRef(null);

  // hasPermission이 true가 되면 1초마다 time이 1씩 증가
  useEffect(() => {
    if (hasPermission) {
      // startTime에 현재 시간 저장
      startTime.current = new Date();
      console.log(startTime.current);
      const interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [hasPermission]);

  // Modal
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div className={style.container}>
      <div className={style.item_top}>
        <button>뒤로가기</button>
      </div>

      <div className={style.item_camera}>
        <CameraComponent
          count={count}
          setCount={setCount}
          hasPermission={hasPermission}
          setHasPermission={setHasPermission}
        />
      </div>

      <div className={style.item}>
        <Counter count={count} />
        <div>운동 시간 {time}</div>
        <div>
          <button>운동 종료하기</button>
        </div>
        <div>
          <button onClick={increaseCount}>Count up for test</button>
        </div>
      </div>
    </div>
  );
}

export default Record;
