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

  const handleLogout = () => {
    localStorage.removeItem('auth');
    window.location.href = '/';
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const sendExerciseData = async () => {
    try {
      const exerciseData = {
        id: 'wnvyWkd123',//id,
        date: '2023-05-27',//selectedDate.toISOString().split(0, 10),
      };
  
      const response = await axios.post('http://13.209.109.234:5000/exercise_log', exerciseData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  
  

  const handleAddExercise = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalSubmit = () => {
    setShowModal(false);
  };

  useEffect(() => {
    sendExerciseData();
  }, []);

  return (
    <div>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Navbar.Brand>SHrack</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#">MyPage</Nav.Link>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
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
                    No exercise records found for {selectedDate.toLocaleDateString()}
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
              onClick={handleAddExercise}
            >
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
