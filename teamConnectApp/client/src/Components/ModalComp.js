import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { socket } from "../Model";

function ModalComp({ state, close, onlineUsers }) {
  const [Online, setOnline] = useState();

  useEffect(() => {
    socket.on("message", (res) => {
      setOnline(res.onlineUsers);
    });
  });

  return (
    <Modal size="lg" centered show={state}>
      <Modal.Header  closeButton onHide={close}>
        <Modal.Title>Online users</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul className="online-list-marker">
          {Online
            ? Online.map((item, index) => {
                return <li id={index.toString()}>{item}</li>;
              })
            : onlineUsers.map((item, index) => {
                return <li id={index.toString()}>{item}</li>;
              })}
        </ul>
      </Modal.Body>
    </Modal>
  );
}

export default ModalComp;
