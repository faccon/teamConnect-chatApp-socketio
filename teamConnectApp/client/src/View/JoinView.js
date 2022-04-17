import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Container, Col, Row, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { signInUser } from "../Controllers";
import { SocialIcon } from "react-social-icons";
import { GITHUB_URL, LINKEDIN, MAILTO } from "../shared";
import Brand from "../Components/Brand";

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
          navigate(`./chat?name=${name}&room=${room}`, {
            state: { user },
          });
        }
      });
    }
  }


  return (
    <Container className="main-container">
      <Row className="inner-container">
        <Col md={6} className="d-none d-md-block">
          <div className="left-container "></div>
        </Col>
        <Col md={6} className="align-self-center">
          <Brand />
          <Col sm={12}>
            <h3 className=" faint mt-2 mb-3">
              Welcome to TeamConnect, pleases login to continue
            </h3>
          </Col>
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
          <Col xs={{ offset: 3, span: 6 }} className="bottom-flags mt-5">
            <SocialIcon
              className="icons"
              target="_blank"
              rel="noopener noreferrer"
              fgColor="black"
              bgColor="whitesmoke"
              url={LINKEDIN}
            />
            <SocialIcon
              className="icons"
              target="_blank"
              rel="noopener noreferrer"
              fgColor="black"
              bgColor="whitesmoke"
              url={GITHUB_URL}
            />
            <SocialIcon
              className="icons"
              target="_blank"
              rel="noopener noreferrer"
              fgColor="black"
              bgColor="whitesmoke"
              url={MAILTO}
            />
          </Col>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
}

export default JoinView;
