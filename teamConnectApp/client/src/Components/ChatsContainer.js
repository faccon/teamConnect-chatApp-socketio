import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { socket } from "../Model";
import ReactEmoji from "react-emoji";

function ChatsContainer({ name, adminMsg }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  function sendMessage(event) {
    if (event) {
      event.preventDefault();
    }
    if (message) {
      socket.emit("sendMessage", message, () => {
        setMessage("");
      });
    }
  }

  useEffect(() => {
    setMessages([adminMsg]);
  }, [adminMsg]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
      console.log(message);
    });
  });

  return (
    <div className="chat-container">
      <div className="chat-scrollable">
        {messages
          .slice(0)
          .reverse()
          .map((item, index) => {
            return (
              <>
                {item.user === "admin" ? (
                  <div className="admin">{item.text}</div>
                ) : (
                  <div
                    id={index.toString()}
                    className={
                      item.user === name
                        ? "msg-container-self"
                        : "msg-container"
                    }
                  >
                    <Row>
                      <Col
                        xs={12}
                        className={item.user === name ? "d-none" : "msg-title"}
                      >
                        {item.user}
                      </Col>
                      <Col xs={12} className="msg-msg">
                        {ReactEmoji.emojify(item.text)}
                      </Col>
                    </Row>
                  </div>
                )}
              </>
            );
          })}
      </div>

      <Row className="d-flex align-items-center bottom-row">
        <Col xs={10}>
          <Form.Group>
            <Form.Control
              type="text"
              name="message"
              className="chat-input"
              placeholder="Type a message ..."
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={(event) =>
                event.code === "Enter" ? sendMessage(event) : null
              }
              value={message}
            />
          </Form.Group>
        </Col>
        <Col
          xs={2}
          onClick={() => sendMessage(null)}
          className="send-icon d-flex align-items-center justify-content-center"
        >
          <div className="d-flex align-items-center send">
            <span className="material-icons md-24">send</span>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ChatsContainer;
