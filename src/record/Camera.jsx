import React, { useEffect, useRef, useState } from 'react';
import styles from './Camera.module.css';
import axios from 'axios';

function CameraComponent({ count, setCount, hasPermission, setHasPermission }) {
  const videoRef = useRef(null);
  //const [hasPermission, setHasPermission] = useState(null);
  const [stream, setStream] = useState(null);
  //사용자 디바이스에 카메라가 없다면, 카메라가 없다는 메시지를 보여줌

  // test용 값
  const user_id = 'test';
  const uuid = '123';
  const exercise_type = 'squat-left-leg';

  // 사용자가 카메라 접근 허용을 했는지 확인
  // 만약 허용을 안했다면, 허용을 요청
  useEffect(() => {
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
  });
  // 카메라 접근 허용을 했다면, videoRef에 stream을 넣어줌
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [hasPermission, stream]);

  // 카메라가 없다면, 카메라가 없다는 메시지를 보여줌
  if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
    return <div>카메라가 없습니다.</div>;
  }
  // 카메라 접근 허용을 했다면, videoRef를 보여줌
  if (hasPermission === null) {
    return <div />;
  }
  // 카메라 접근 허용을 하지 않았다면, 허용을 요청하는 버튼 보여줌
  if (hasPermission === false) {
    return (
      <div>
        카메라 접근을 허용해주세요
        <br />
        <button
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
        </button>
      </div>
    );
  }
  function sendImage() {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0);

    canvas.toBlob(
      blob => {
        const formData = new FormData();
        formData.append('file', blob, 'file.jpg', { type: 'image/jpeg' });
        console.log(formData);
        axios
          .post(
            `http://34.69.53.183:8090/inference/image/${user_id}/${uuid}/${exercise_type}`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            },
          )
          .then(res => {
            console.log(res.data.count);
            if (res.data > count) {
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
  }

  setInterval(() => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0);

    canvas.toBlob(
      blob => {
        const formData = new FormData();
        formData.append('file', blob, 'file.jpg', { type: 'image/jpeg' });
        console.log(formData);
        axios
          .post(
            `http://34.69.53.183:8090/inference/image/${user_id}/${uuid}/${exercise_type}`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            },
          )
          .then(res => {
            console.log(res.data.count);
            if (res.data > count) {
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
  }, 5000);

  return (
    <video playsInline autoPlay ref={videoRef} className={styles.camera} />
  );
}

export default CameraComponent;
