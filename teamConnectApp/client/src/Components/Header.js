import React from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import { socket } from "../Model";

function Header({ name }) {
  const navigate = useNavigate();

  function handleLogOut() {
    socket.emit("signout");
    socket.off();
    navigate("/");
  }

  return (
    <div className="header-container d-flex align-items-center">
      <Row md={12} className="d-flex align-items-center w-100 m-0">
        <Col xs={12} md={2} className="d-flex align-items-center w-100 m-0">
          <Col xs={2} md={1}>
            <div className="online-dot"></div>
          </Col>
          <Col xs={2} md={2}>
            <Col xs={12} className="header-name">
              {name}
            </Col>
            <Col className="header-status">
              {name ? <span>online</span> : <span>offline</span>}
            </Col>
          </Col>
          <Col xs={8} md={8} className="d-flex justify-content-end logout">
            <span onClick={handleLogOut} className="material-icons md-24">
              logout
            </span>
          </Col>
        </Col>
      </Row>
    </div>
  );
}

export default Header;
