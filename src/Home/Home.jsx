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
        id: 'wnvyWkd123', 
        date: '2023-05-27', 
      };

      const response = await axios.post('http://13.209.109.234:5000/exercise_log', exerciseData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setExerciseRecords(response.data);
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

      <div className="d-flex justify-content-center align-items-center mt-5">
        <div style={{ width: '500px' }}>
          <Card.Body>
            <Card.Title className="text-center">
              Welcome to SHrack! Hello User {id}
            </Card.Title>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              className="w-100 mb-3"
              inline // Show the DatePicker as a calendar
            />
            {selectedDate && (
              <div>
                <h6 className="mb-3">
                  Exercise information on {selectedDate.toLocaleDateString()}
                </h6>
                {exerciseRecords.length > 0 ? (
                  exerciseRecords.map((record, index) => (
                    <Card key={index} className="mb-2">
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
          </Card.Body>
        </div>
      </div>

      <Button
        variant="primary"
        className="rounded-circle position-fixed bottom-0 end-0 m-3"
        style={{ width: '75px', height: '75px' }}
        onClick={handleAddExercise}
      >
        🏋️
      </Button>

      <ExerciseStartModal isModalShow={showModal} setModalShow={setShowModal} />
    </div>
  );
};

export default HomePage;
