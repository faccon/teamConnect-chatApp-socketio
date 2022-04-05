import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Container, Row, Col } from "react-bootstrap";
import { ENDPOINT, socket } from "../Model";
import Header from "../Components/Header";
import ChatsContainer from "../Components/ChatsContainer";
import Dashboard from "./Dashboard";

function ChatView() {
  let location = useLocation();
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  useEffect(() => {
    setName(location.state.user.name);
    setRoom(location.state.user.room);

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  return (
    <Container className="chatsview-cont">
      <Row>
        <Col md={6} className="">
          <div className="">
            <Header name={name} />
            <ChatsContainer name={name} />
          </div>
        </Col>
        <Col md={6} className="d-none d-md-block">
          <Dashboard onlineUsers={location.state.onlineUsers} />
        </Col>
      </Row>
    </Container>
  );
}

export default ChatView;
