import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Card, Navbar, Nav, Button } from 'react-bootstrap';
import axios from 'axios';
import ExerciseStartModal from '../components/ExerciseStartModal';
import { formatISO, startOfDay, isToday } from 'date-fns';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

const HomePage = () => {
  const [id, setId] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [exerciseRecords, setExerciseRecords] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('auth');
    window.location.href = process.env.PUBLIC_URL;
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    const authId = localStorage.getItem('auth');
    setId(authId);
    const today = new Date();
    if (isToday(today)) {
      sendExerciseData(today);
      setSelectedDate(today);
    }
  }, []);

  useEffect(() => {
    sendExerciseData(selectedDate);
  }, [selectedDate]);

  const sendExerciseData = async (date) => {
    try {
      const formattedDate = formatISO(startOfDay(date), {
        representation: 'date',
      });
      const exerciseData = {
        id,
        date: formattedDate,
      };
      const response = await axios.post(
        'https://shrack.p-e.kr/exercise_log',
        exerciseData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setExerciseRecords(response.data.exercise_log);
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

  return (
    <div className="home-page">
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

      <div className="content">
        <div className="welcome">
          <h1 className="welcome-title">Welcome to SHrack!</h1>
          <p className="welcome-subtitle">{id ? `Hello, User, ${id}. click the date you want to see !` : ''}</p>
        </div>

        <div className="exercise-info">
          <div className="date-picker-container">
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              className="date-picker"
            />
          </div>

          <div className="center-container">
            {selectedDate && (
              <div>
                <h6 className="exercise-data-title">
                  Exercise information on {selectedDate.toLocaleDateString()}
                </h6>
                {exerciseRecords.length > 0 ? (
                  exerciseRecords.map((record, index) => (
                    <Card key={index} className="exercise-card">
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
                  <p className="no-records">
                    No exercise records found for{' '}
                    {selectedDate.toLocaleDateString()}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <Button
        variant="primary"
        className="add-exercise-button"
        onClick={handleAddExercise}
      >
        🏋️
      </Button>

      <ExerciseStartModal isModalShow={showModal} setModalShow={setShowModal} />
    </div>
  );
};
export default HomePage;
