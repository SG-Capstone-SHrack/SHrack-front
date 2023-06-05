import React, { useEffect, useRef, useState } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import styles from './Camera.module.css';
import axios from 'axios';

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
  const [stream, setStream] = useState(null);
  const [intervalId, setIntervalId] = useState(null);

  const [userId, setUserId] = useState('');
  const [uuid, setUuid] = useState('');

  let exercise_type = exerciseType + '-' + exerciseDirection;
  if (exerciseType === 'squat') {
    exercise_type = exercise_type + '-leg';
  } else {
    exercise_type = exercise_type + '-arm';
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

  useEffect(() => {
    // uuid는 현재 yyyymmddhhmmss
    const uuid = new Date()
      .toISOString()
      .slice(0, 19)
      .replace(/-/g, '')
      .replace(/:/g, '')
      .replace('T', '');
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

    return () => {
      clearInterval(intervalId); // Clean up interval on unmount
    };
  }, []);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [hasPermission, stream]);

  useEffect(() => {
    if (isExerciseEnd) {
      clearInterval(intervalId); // Clear the interval when exercise ends
    }
  }, [isExerciseEnd]);

  useEffect(() => {
    if (hasPermission && !isExerciseEnd) {
      const newIntervalId = setInterval(sendImage, 5000);
      setIntervalId(newIntervalId);

      return () => {
        clearInterval(newIntervalId); // Clean up interval on unmount
      };
    }
  }, [hasPermission, isExerciseEnd]);

  // 카메라가 없으면 카메라가 없다는 메세지 출력
  if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
    return <Alert variant="danger">기기에 카메라가 없습니다.</Alert>;
  }
  // 에러 핸들링
  if (hasPermission === null) {
    return <div>권한 상태 비정상</div>;
  }
  // 권한이 없을 경우, 권한 요청 버튼
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
  // 권한이 있으면 카메라 화면을 보여줌
  return (
    <video playsInline autoPlay ref={videoRef} className={styles.camera} />
  );
}

export default CameraComponent;
