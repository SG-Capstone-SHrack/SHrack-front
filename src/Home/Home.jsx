import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Card, Table, Form, Navbar, Nav } from 'react-bootstrap';

const HomePage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [exerciseRecords, setExerciseRecords] = useState({});
  const [userInfo, setUserInfo] = useState({ name: '' });

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setExerciseRecords({});
  };

  const GetData = () => {
    // 데이터 1개 임의로 설정(받아오는 형식에 따라 변경하기)
    const fetchedRecords = {
      exerciseName: 'Exercise Name',
      numberOfSets: 3,
      totalTime: '00:30:00',
      weight: '100',
    };
    setExerciseRecords(fetchedRecords);
  };

  const handleUserChange = (event) => {
    const { name, value } = event.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };

  return (//상단바
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
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Card style={{ width: '500px' }}>
          <Card.Body>
            <Card.Title style={{ marginBottom: '20px' }}>Welcome to SHrack! Hello {userInfo.name}</Card.Title>
            <Form.Group>
              <Form.Label>User Name:</Form.Label>
              <Form.Control type="text" name="name" onChange={handleUserChange} />
            </Form.Group>
            <DatePicker selected={selectedDate} onChange={handleDateChange} style={{ marginBottom: '20px' }} />

            {selectedDate && (
              <div>
                <h6>Exercise informations on {selectedDate.toLocaleDateString()}</h6>
                {exerciseRecords.exerciseName && (
                  <Table striped bordered>
                    <thead>
                      <tr>
                        <th>Field Name</th>
                        <th>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Exercise Name</td>
                        <td>{exerciseRecords.exerciseName}</td>
                      </tr>
                      <tr>
                        <td>Number of Sets</td>
                        <td>{exerciseRecords.numberOfSets}</td>
                      </tr>
                      <tr>
                        <td>Total Time</td>
                        <td>{exerciseRecords.totalTime}</td>
                      </tr>
                      <tr>
                        <td>Weight</td>
                        <td>{exerciseRecords.weight}</td>
                      </tr>
                    </tbody>
                  </Table>
                )}
                {!exerciseRecords.exerciseName && (
                  <button onClick={GetData}>Get My Exercise Data</button>
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
