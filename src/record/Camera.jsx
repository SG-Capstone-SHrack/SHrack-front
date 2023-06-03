import React, { useEffect, useRef, useState } from 'react';
import {
  Card,
  Button,
  Form,
  Container,
  FloatingLabel,
  Alert,
  Row,
  Col,
  Modal,
} from 'react-bootstrap';
import styles from './Camera.module.css';
import axios from 'axios';
import { clear } from '@testing-library/user-event/dist/clear';

function CameraComponent({
  count,
  setCount,
  hasPermission,
  setHasPermission,
  exerciseType,
  exerciseGoal,
  exerciseDirection,
  exerciseMass,
  isExerciseEnd,
  startTime,
}) {
  const videoRef = useRef(null);
  //const [hasPermission, setHasPermission] = useState(null);
  const [stream, setStream] = useState(null);
  //사용자 디바이스에 카메라가 없다면, 카메라가 없다는 메시지를 보여줌

  const [userId, setUserId] = useState('');
  const [uuid, setUuid] = useState('');

  // exercise_type은 exerciseType과 exerciseDirection을 합친 값
  let exercise_type = exerciseType + '-' + exerciseDirection;
  if (exerciseType === 'squat') {
    exercise_type = exercise_type + '-leg';
  } else {
    exercise_type = exercise_type + '-arm';
  }

  // 사용자가 카메라 접근 허용을 했는지 확인
  // 만약 허용을 안했다면, 허용을 요청
  useEffect(() => {
    // uuid 설정 -> 6자리 난수
    const uuid = Math.floor(Math.random() * 1000000);
    setUuid(uuid);

    setUserId(localStorage.getItem('auth'));
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(stream => {
        setHasPermission(true);
        setStream(stream);
      })
      .catch(err => {
        setHasPermission(false);
        console.log(err);
      });
  }, []); // 이거 괄호 뺴면 안됨
  // 카메라 접근 허용을 했다면, videoRef에 stream을 넣어줌
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [hasPermission, stream]);

  // 카메라가 없다면, 카메라가 없다는 메시지를 보여줌
  if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
    return <Alert variant="danger">기기에 카메라가 없습니다.</Alert>;
  }
  // 카메라 접근 허용을 했다면, videoRef를 보여줌
  if (hasPermission === null) {
    return <div />;
  }
  // 카메라 접근 허용을 하지 않았다면, 허용을 요청하는 버튼 보여줌
  if (hasPermission === false) {
    return (
      <Card className="text-center" style={{ width: '80%', margin: '1rem' }}>
        <Card.Header>카메라 권한이 필요합니다. </Card.Header>
        <Card.Body>카메라 접근을 허용해주세요. </Card.Body>
        <br />
        <Button
          style={{
            margin: '1rem',
          }}
          onClick={() => {
            navigator.mediaDevices
              .getUserMedia({ video: true })
              .then(stream => {
                setHasPermission(true);
                setStream(stream);
              })
              .catch(err => {
                setHasPermission(false);
                console.log(err);
              });
          }}>
          허용
        </Button>
      </Card>
    );
  }
  const sendImage = () => {
    if (!hasPermission) {
      return;
    }
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0);

    canvas.toBlob(
      blob => {
        const formData = new FormData();
        formData.append('file', blob, 'file.jpg');
        console.log(formData);
        //http://34.69.53.183:8090
        axios
          .post(
            `https://shrack-ml.p-e.kr/inference/image/${userId}/${uuid}/${exercise_type}`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            },
          )
          .then(res => {
            console.log(res.data.count);
            if (parseInt(res.data.count) > count) {
              setCount(res.data.count);
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      'image/jpeg',
      0.1,
    );
  };
  const repeatWork = () => {
    sendImage();
    setTimeout(repeatWork, 5000);
  };
  const timeoutId = setTimeout(repeatWork, 5000);
  //clearTimeout(timeoutId); //testpurpose
  if (isExerciseEnd) {
    clearTimeout(timeoutId);
  }

  return (
    <video playsInline autoPlay ref={videoRef} className={styles.camera} />
  );
}

export default CameraComponent;
