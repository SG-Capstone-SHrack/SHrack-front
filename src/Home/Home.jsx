import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Navbar, Nav, Card, Button } from 'react-bootstrap';
import axios from 'axios';

const HomePage = () => {
  const { id } = useParams();
  const history = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date()); // 오늘 날짜가 default값으로 되게끔 변경
  const [exerciseRecords, setExerciseRecords] = useState([]); //비밀번호 받아오는 걸로
  const [password, setPassword] = useState('');
  const [isAlert, setIsAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [exerciseType, setExerciseType] = useState('');
  const [exerciseGoal, setExerciseGoal] = useState('');

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const fetchExerciseRecords = () => {
     // 서버에 선택한 날짜 정보 보내기 => 추후 수정하기
    const authToken = localStorage.getItem('auth');
    if (authToken && selectedDate) {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: authToken,
      };
 
      axios  // 서버에서 받아온 데이터를 exerciseRecords에 저장
        .get(`http://your-api-endpoint/exercise-records?date=${selectedDate}`, { headers })
        .then((response) => {
          const fetchedRecords = response.data;
          setExerciseRecords(fetchedRecords);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    fetchExerciseRecords();
  }, [selectedDate]);
  const handleLogin = (e) => {  // 아이디와 비밀번호 서버에 전달 => 추후 수정
    e.preventDefault();
    if (!id || !password) {
      setIsAlert(true);
      return;
    }
    const data = {
      id: id,
      password: password,
    };

    const headers = {
      'Content-Type': 'application/json',
    };
    setIsLoading(true);
    axios
      .post('http://your-api-endpoint/login', JSON.stringify(data), { headers })
      .then((res) => {
        localStorage.setItem('auth', res.data.key);
        window.location.href = '/';
      })
      .catch((err) => {
        console.log(err);
        setIsAlert(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handleAddExercise = () => {
    const exerciseData = {
      exerciseType: exerciseType,
      exerciseGoal: exerciseGoal,
    };
    history.push(`/next-page?exerciseType=${exerciseType}&exerciseGoal=${exerciseGoal}`);
  };
 
  return ( //상단 바(마이페이지, 로그아웃, 기타 메뉴) 
    <div>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Navbar.Brand>SHrack</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#">MyPage</Nav.Link>
            <Nav.Link href="#">Logout</Nav.Link>
            <Nav.Link href="#">Other Menu</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <div style={{ width: '500px' }}>
          <Card.Body>
            <Card.Title style={{ marginBottom: '20px' }}>Welcome to SHrack! Hello User {id}</Card.Title>
            <DatePicker selected={selectedDate} onChange={handleDateChange} style={{ marginBottom: '20px' }} />

            {selectedDate && (
              <div>
                <h6>Exercise information on {selectedDate.toLocaleDateString()}</h6>

                {exerciseRecords.length > 0 ? (
                  exerciseRecords.map((record, index) => (
                    <Card key={index} style={{ marginBottom: '10px' }}>
                      <Card.Body>
                        <Card.Title>{record.exerciseName}</Card.Title>
                        <div style={{ display: 'flex', marginTop: '10px' }}>
                          {[...Array(record.totalSets)].map((_, i) => (
                            <div
                              key={i}
                              style={{
                                backgroundColor: i < record.numberOfSets ? 'blue' : 'gray',
                                width: '20px',
                                height: '10px',
                                marginRight: '5px',
                              }}
                            />
                          ))}
                        </div>
                        <Card.Text>
                          Number of Sets: {record.numberOfSets} / {record.totalSets}
                        </Card.Text>
                        <Card.Text>Weight: {record.weight} kg</Card.Text>
                        <Card.Text>Total Time: {record.totalTime}</Card.Text>
                      </Card.Body>
                    </Card>
                  ))
                ) : (
                  <Card style={{ marginBottom: '10px' }}>
                    <Card.Body>
                      <Card.Title>Example Exercise Name</Card.Title>
                      <div style={{ display: 'flex', marginTop: '10px' }}>
                        <div
                          style={{
                            backgroundColor: 'blue',
                            width: '20px',
                            height: '10px',
                            marginRight: '5px',
                          }}
                        />
                        <div
                          style={{
                            backgroundColor: 'blue',
                            width: '20px',
                            height: '10px',
                            marginRight: '5px',
                          }}
                        />
                        <div
                          style={{
                            backgroundColor: 'gray',
                            width: '20px',
                            height: '10px',
                            marginRight: '5px',
                          }}
                        />
                      </div>
                      <Card.Text>Number of Sets: 2 / 3</Card.Text>
                      <Card.Text>Weight: 50 kg</Card.Text>
                      <Card.Text>Total Time: 00:30:00</Card.Text>
                    </Card.Body>
                  </Card>
                )}
              </div>
            )}
          </Card.Body>
          <Button
            variant="primary"
            style={{
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '24px',
            }}
            onClick={() => {
              setExerciseType('');
              setExerciseGoal('');
            }}
          >
            &#10003;
          </Button>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
