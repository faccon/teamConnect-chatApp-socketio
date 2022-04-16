import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import { socket } from "../Model";

function Header({ name, onlineUsers, modal }) {
  const navigate = useNavigate();
  const [Online, setOnline] = useState();

  function handleLogOut() {
    socket.emit("signout");
    socket.off();
    navigate("/");
  }

  useEffect(() => {
    socket.on("message", (res) => {
      setOnline(res.onlineUsers);
    });
  });

  return (
    <div className="header-container d-flex align-items-center">
      <Row md={12} className="d-flex align-items-center w-100 m-0">
        <Col xs={12} md={12} className="d-flex align-items-center p">
          <Col xs={2} md={12} className="header-left w-75" onClick={modal}>
            <Col xs={12} className="header-name">
              {name}
            </Col>
            <Col className="header-online d-block d-md-none">
              {Online
                ? Online.map((item, i) => {
                    if (Online.length > 1 && i !== Online.length - 1) {
                      return item !== name ? item + ", " : null;
                    } else {
                      return item !== name ? item : null;
                    }
                  })
                : onlineUsers.map((item, i) => {
                    if (
                      onlineUsers.length > 1 &&
                      i !== onlineUsers.length - 1
                    ) {
                      return item !== name ? item + ", " : null;
                    } else {
                      return item !== name ? item : null;
                    }
                  })}
            </Col>
          </Col>
          <Col xs={8} md={8} className="d-flex justify-content-end w-25 logout">
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
