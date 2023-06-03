import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Card, Navbar, Nav, Button, ProgressBar } from 'react-bootstrap';
import axios from 'axios';
import ExerciseStartModal from '../components/ExerciseStartModal';
import { formatISO } from 'date-fns'; //날짜 포매팅 위해 추가

const HomePage = () => {
  const [id, setId] = useState(''); //id 상수 추가
  const [selectedDate, setSelectedDate] = useState(new Date()); //날짜 상수 추가

  const [exerciseRecords, setExerciseRecords] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const handleLogout = () => {
    //로그아웃 시 : 로컬스토리지에서 auth 삭제 후 홈으로 이동
    localStorage.removeItem('auth');
    window.location.href = process.env.PUBLIC_URL;
  };
  useEffect(() => {
    //로그인 시 : 로컬스토리지에서 auth 가져와서 저장
    const authId = localStorage.getItem('auth');
    setId(authId);
  }, []);

  const handleDateChange = date => {
    //date-picker에서 날짜 선택할 때마다 선택한 날짜로 상수 변경 후 저장
    setSelectedDate(date);
  };
  useEffect(() => {
    //날짜 선택할 때마다 데이터 보내기 위해 끝부분에 [selectedDate] 추가
    sendExerciseData();
  }, [selectedDate]);

  const sendExerciseData = async () => {
    //서버에 데이터 보내기(id, date 정보)
    try {
      const formattedDate = formatISO(selectedDate, { representation: 'date' });
      const exerciseData = {
        id,
        date: formattedDate,
      };
      const response = await axios.post(
        //서버에서 id, date정보에 매칭하는 데이터 받아오기 => 서버로 넘길 때 CORS 에러 발생하는 것 때문에 allow cors 설치하고 켜서 테스트 진행했습니다
        'https://shrack.p-e.kr/exercise_log',
        exerciseData,
        {
          headers: {
            'Content-Type': 'application/json', //json 형식으로 받아오는 부분
          },
        },
      );
      setExerciseRecords(response.data.exercise_log); //다시 exercise_log에 저장
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddExercise = () => {
    //모달창 띄우고 닫는 부분
    setShowModal(true);
  };
  const handleModalClose = () => {
    setShowModal(false);
  };
  const handleModalSubmit = () => {
    setShowModal(false);
  };

  return (
    //상단 메뉴바
    <div>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Navbar.Brand>SHrack</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#">MyPage</Nav.Link>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          padding: '0 20px',
        }}>
        <div style={{ width: '500px' }}>
          <Card.Body>
            <Card.Title style={{ marginBottom: '20px' }}>
              Welcome to SHrack! Hello {id ? `User ${id}` : ''}
            </Card.Title>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              style={{ marginBottom: '20px' }}
            />
            {selectedDate && (
              <div>
                <h6>
                  Exercise information on {selectedDate.toLocaleDateString()}
                </h6>
                {exerciseRecords.length > 0 ? (
                  exerciseRecords.map((record, index) => (
                    <Card key={index} style={{ marginBottom: '10px' }}>
                      <Card.Body>
                        <Card.Title>{record.exercise_name}</Card.Title>
                        <Card.Text>Start Time: {record.start_time}</Card.Text>
                        <Card.Text>End Time: {record.end_time}</Card.Text>
                        <Card.Text>
                          Total Exercise Time: {record.exercise_time}
                        </Card.Text>
                        <Card.Text>Mass: {record.mass}</Card.Text>
                        <Card.Text>Count: {record.count}</Card.Text>
                      </Card.Body>
                    </Card>
                  ))
                ) : (
                  <p>
                    No exercise records found for{' '}
                    {selectedDate.toLocaleDateString()}
                  </p>
                )}
              </div>
            )}
            <Button
              variant="primary"
              style={{
                width: '75px',
                height: '75px',
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                borderRadius: '50%',
              }}
              onClick={handleAddExercise}>
              🏋️
            </Button>
          </Card.Body>
        </div>
      </div>

      <ExerciseStartModal isModalShow={showModal} setModalShow={setShowModal} />
    </div>
  );
};

export default HomePage;
