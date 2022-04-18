import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { socket } from "../Model";
import { Button } from "@mui/material";
import InviteFriends from "../Components/InviteModal";
import LoadingButton from "../Components/LoadingButton";
import { APP_URL, MAIL, NAME, NODEJS_API_URL } from "../shared";

function Dashboard({ onlineUsers, name, room }) {
  const [Online, setOnline] = useState(null);
  const [Invitations, setInvitations] = useState([]);
  const [modal, setModal] = useState(false);
  const [sending, setSending] = useState("");

  useEffect(() => {
    socket.on("message", (res) => {
      setOnline(res.onlineUsers);
    });
  });

  const toggleModal = () => {
    setModal(!modal);
  };

  const inviteMe = async () => {
    setSending("sending");
    await fetch(`${NODEJS_API_URL}/send/template/invite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({
        to: MAIL,
        sender: name,
        recipient: NAME,
        url: `${APP_URL}/invite/${room}`,
      }),
    })
      .then(() => {
        setSending("sent");
        setInvitations([...Invitations, NAME]);
        setTimeout(() => {
          setSending("");
        }, 2000);
      })
      .catch((err) => {
        setSending("error");
      });
  };

  return (
    <div className="right-panel">
      <Col md={12} className="align-self-center">
        <div className="brand">
          <Col sm={12}>
            <h1 className="logo"> teamCONNECT </h1>
            <div className="line"></div>
          </Col>
        </div>
      </Col>
      <div className="online-cont"></div>
      <Container>
        <Row>
          <Col md={6}>
            <span className="online">Online:</span>
            <ul className="online-list-marker">
              {Online
                ? Online.map((item, index) => {
                    return <li id={index.toString()}>{item}</li>;
                  })
                : onlineUsers.map((item, index) => {
                    return <li id={index.toString()}>{item}</li>;
                  })}
            </ul>
          </Col>

          {/* Sent Invitations */}
          <Col md={6}>
            <div className="iv-container">
              {Invitations ? (
                <>
                  <span className="online">Sent Invitations:</span>
                  {Invitations.map((item, index) => {
                    return (
                      <div className="inv-item" id={index.toString()}>
                        {item}
                        <span className="iv-icon material-icons-outlined">
                          check_circle_outline
                        </span>
                      </div>
                    );
                  })}
                </>
              ) : null}
            </div>
            <Button
              onClick={toggleModal}
              size="small"
              color="secondary"
              variant="outlined"
              className="mt-2"
              startIcon={
                <span class="material-icons-outlined">person_add_alt</span>
              }
            >
              invite friends
            </Button>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col md={12}>
            <span className="title">Cloud hosted chat application</span>
          </Col>
          <Col md={12}>
            <span className="notes">
              BackEnd with NodeJS, Socket.io & Express <br /> IBM Cloud <br />{" "}
              Instance: 2/2
            </span>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col md={12}>
            <span className="title">Designed by: BABS</span>
          </Col>
          <Col md={6} className="mt-3">
            <LoadingButton
              className="custom-btn"
              spinnerColor="black"
              state={sending}
              action={inviteMe}
            />
          </Col>
        </Row>
        <InviteFriends
          state={modal}
          handleClose={toggleModal}
          invitaions={Invitations}
          updateSent={setInvitations}
          room={room}
          name={name}
        />
      </Container>
    </div>
  );
}

export default Dashboard;
