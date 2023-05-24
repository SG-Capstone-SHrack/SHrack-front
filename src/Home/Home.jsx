import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Card, Navbar, Nav, Button } from 'react-bootstrap';
import axios from 'axios';
import ExerciseStartModal from '../components/ExerciseStartModal';

const HomePage = () => {
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [exerciseRecords, setExerciseRecords] = useState([]);

  const [showModal, setShowModal] = useState(false);  

  const [exerciseType, setExerciseType] = useState('');
  const [exerciseGoal, setExerciseGoal] = useState('');

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setExerciseRecords([]);
    if (date) {
      fetchExerciseRecords(date); 
    }
  };

  const handleFetchData = () => { //임시 데이터 => 추후 수정 예정
    const fetchedRecords = [
      {
        exerciseName: 'Exercise 1',
        numberOfSets: 3,
        totalSets: 5,
        weight: 50,
        totalTime: '00:30:00',
      },
      {
        exerciseName: 'Exercise 2',
        numberOfSets: 4,
        totalSets: 6,
        weight: 40,
        totalTime: '00:25:00',
      },
    ];
    setExerciseRecords(fetchedRecords);
  };

  const fetchExerciseRecords = (date) => { //임시 데이터 => 추후 수정 예정
    const fetchedRecords = [
      {
        exerciseName: 'Exercise 1',
        numberOfSets: 3,
        totalSets: 5,
        weight: 50,
        totalTime: '00:30:00',
      },
    ];
    setExerciseRecords(fetchedRecords);
  };

  useEffect(() => {
    handleFetchData();
    fetchExerciseRecords(selectedDate);
  }, [selectedDate]);

  const handleAddExercise = () => { //모달창 띄우기, 닫기 함수
    setShowModal(true);
  };
  const handleModalClose = () => {
    setShowModal(false);
  };
  const handleModalSubmit = () => {
    setShowModal(false);
  };

  return ( //상단 메뉴바
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
                  <p>No exercise records available for {selectedDate.toLocaleDateString()}</p>
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
              borderRadius: '50%' }}
              onClick={handleAddExercise}
            >
            {/* &#10003; */}
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
