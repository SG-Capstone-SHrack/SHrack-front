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

  if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
    return <Alert variant="danger">기기에 카메라가 없습니다.</Alert>;
  }

  if (hasPermission === null) {
    return <div />;
  }

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

  return (
    <video playsInline autoPlay ref={videoRef} className={styles.camera} />
  );
}

export default CameraComponent;
