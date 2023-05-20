import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Card, Navbar, Nav } from 'react-bootstrap';
import axios from 'axios';

const HomePage = () => {
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState(null);
  const [exerciseRecords, setExerciseRecords] = useState([]);
  const [password, setPassword] = useState('');  //패스워드 받을 예정
  const [isAlert, setIsAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setExerciseRecords([]);
    if (date) {
      fetchExerciseRecords(date);
    }
  };

  const handleFetchData = () => {
    //임시 데이터
    const fetchedRecords = [
      {
        exerciseName: '운동 1',
        numberOfSets: 3,
        totalSets: 5,
        weight: 50,
        totalTime: '00:30:00',
      },
      {
        exerciseName: '운동 2',
        numberOfSets: 4,
        totalSets: 6,
        weight: 40,
        totalTime: '00:25:00',
      },
    ];
    setExerciseRecords(fetchedRecords);
  };

  const fetchExerciseRecords = (date) => {//date를 받아서 서버에 전송 => 추후 추가 예정
    const authToken = localStorage.getItem('auth');
    if (authToken) {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: authToken,
      };

      axios
        .get(`http://your-api-endpoint/exercise-records?date=${date}`, { headers })
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
    handleFetchData();

    const authToken = localStorage.getItem('auth');
    if (authToken && selectedDate) {
      fetchExerciseRecords(selectedDate);
    }
  }, [id]);

  const handleLogin = (e) => { // id와 password를 받아서 서버에 전송 => 추후 추가 예정
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
  //상단 메뉴바
  return (
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
        <Card style={{ width: '500px' }}>
          <Card.Body>
            <Card.Title style={{ marginBottom: '20px' }}>
              Welcome to SHrack! Hello User {id}
            </Card.Title>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              style={{ marginBottom: '20px' }}
            />

            {selectedDate && (
              <div>
                <h6>Exercise information on {selectedDate.toLocaleDateString()}</h6>

                {exerciseRecords.map((record, index) => (
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
                ))}

                {exerciseRecords.length === 0 && (
                  <button onClick={handleFetchData}>Get Exercise Data</button>
                )}
              </div>
            )}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
