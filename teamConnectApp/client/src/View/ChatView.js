import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Container, Row, Col } from "react-bootstrap";
import { socket } from "../Model";
import Header from "../Components/Header";
import ChatsContainer from "../Components/ChatsContainer";
import Dashboard from "./Dashboard";

function ChatView() {
  let location = useLocation();
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [adminMsg, setAdminMsg] = useState("");

  useEffect(() => {
    const name = location.state.user.user.name;
    const room = location.state.user.user.room;
    const adminMsg = location.state.user.adminMsg;

    setName(name);
    setRoom(room);
    setAdminMsg(adminMsg);

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [room, location.state.user.name, location.state.user.room]);

  return (
    <Container className="chatsview-cont">
      <Row>
        <Col md={6} className="">
          <div className="">
            <Header name={name} />
            <ChatsContainer name={name} adminMsg={adminMsg} />
          </div>
        </Col>
        <Col md={6} className="d-none d-md-block">
          <Dashboard onlineUsers={location.state.user.adminMsg.onlineUsers} />
        </Col>
      </Row>
    </Container>
  );
}

export default ChatView;
