import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Container, Row, Col } from "react-bootstrap";
import { socket } from "../Model";
import Header from "../Components/Header";
import ChatsContainer from "../Components/ChatsContainer";
import Dashboard from "./Dashboard";
import ModalComp from "../Components/ModalComp";

function ChatView() {
  let location = useLocation();
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const name = location.state.user.user.name;
    const room = location.state.user.user.room;

    setName(name);
    setRoom(room);

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [room, location.state.user.user.name, location.state.user.user.room]);

  return (
    <Container className="chatsview-cont">
      <Row>
        <Col md={6} className="">
          <div className="">
            <Header
              name={name}
              onlineUsers={location.state.user.adminMsg.onlineUsers}
              modal={() => setModal(!modal)}
            />
            <ChatsContainer
              name={name}
              adminMsg={location.state.user.adminMsg}
            />
          </div>
        </Col>
        <Col md={6} className="d-none d-md-block">
          <Dashboard onlineUsers={location.state.user.adminMsg.onlineUsers} />
        </Col>
      </Row>
      <ModalComp
        state={modal}
        close={() => setModal(!modal)}
        onlineUsers={location.state.user.adminMsg.onlineUsers}
      />
    </Container>
  );
}

export default ChatView;
