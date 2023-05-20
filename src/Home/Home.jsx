import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Card, Navbar, Nav } from 'react-bootstrap';

const HomePage = () => {
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState(null);
  const [exerciseRecords, setExerciseRecords] = useState([]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setExerciseRecords([]);
  };

  const handleFetchData = () => {
    //데이터 받아오기 (임시 기록 2개)
    const fetchedRecords = [
      {
        exerciseName: '운동1',
        numberOfSets: 3,
        totalSets: 5,
        weight: 50,
        totalTime: '00:30:00',
      },
      {
        exerciseName: '운동2',
        numberOfSets: 4,
        totalSets: 6,
        weight: 40,
        totalTime: '00:25:00',
      },
    ];

    setExerciseRecords(fetchedRecords);
  };

  useEffect(() => { //유저 아이디로 데이터 받아오기
    handleFetchData();
  }, [id]);

  return ( //상단 바
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
                <h6>Exercise informations on {selectedDate.toLocaleDateString()}</h6>

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
                  <button onClick={handleFetchData}>Get your Exercise Data</button>
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
