import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ActivityIndicator } from "react-native-web";
import { signInUser } from "../Controllers";

function JoinView(params) {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [loginbtn, setLoginbtn] = useState("Login");
  const [isLogging, setIsLogging] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(event) {
    if (!name || !room) {
      event.preventDefault();
      alert("Please enter a name and select a room");
      setIsLogging(false);
    } else {
      signInUser(name, room, (user) => {
        if (user.error) {
          alert(user.error);
          setIsLogging(false);
        } else {
          navigate(`./chat?name=${name}&room=${room}`, { state: user });
        }
      });
    }
  }

  useEffect(() => {
    if (isLogging) {
      setLoginbtn(
        <ActivityIndicator color="hsla(196, 61%, 58%, 0.75)" size={25} />
      );
    } else setLoginbtn("Login");
  }, [isLogging]);


  return (
    <Container className="main-container">
      <Row className="inner-container">
        <Col md={6} className="d-none d-md-block">
          <div className="left-container "></div>
        </Col>
        <Col md={6} className="align-self-center">
          <div className="form-header">
            <Col sm={12}>
              <h1 className="logo"> teamCONNECT </h1>
              <div className="line"></div>
            </Col>
            <Col sm={12}>
              <h3 className="faint mt-5 mb-2">
                Welcome to TeamConnect, pleases login to continue
              </h3>
            </Col>
          </div>
          <Col>
            <Form>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  name="Name"
                  placeholder="username"
                  onChange={(event) => setName(event.target.value)}
                />
              </Form.Group>

              <Form.Select
                onChange={(event) => setRoom(event.target.value)}
                aria-label="Default select example"
              >
                <option>Choose room</option>
                <option value="Chatroom">Chatroom</option>
                <option value="Technology">Technology</option>
                <option value="Trading">Trading</option>
              </Form.Select>
              <div
                onClick={(event) => handleSubmit(event)}
                className="submit-button mt-5"
              >
                {loginbtn}
              </div>
            </Form>
          </Col>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
}

export default JoinView;
