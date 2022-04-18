import { Badge } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import { socket } from "../Model";
import InviteModal from "./InviteModal";

function Header({ name, room, onlineUsers, modal }) {
  const navigate = useNavigate();
  const [Online, setOnline] = useState();
  const [invModal, setInvModal] = useState(false);
  const [Invitations, setInvitations] = useState([]);

  useEffect(() => {
    socket.on("message", (res) => {
      setOnline(res.onlineUsers);
    });
  });

  function handleLogOut() {
    socket.emit("signout");
    socket.off();
    navigate("/");
  }

  const toggleInvModal = () => {
    setInvModal(!invModal);
  };

  return (
    <div className="header-container d-flex align-items-center">
      <Row md={12} className="d-flex align-items-center w-100 m-0">
        <Col xs={12} md={12} className="d-flex align-items-center p">
          <Col xs={8} md={10} className="header-left" onClick={modal}>
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
          <Col xs={2} className="d-flex ic-cont me-3 d-block d-md-none">
            <Badge
              color="secondary"
              variant="standard"
              badgeContent={Invitations.length}
            >
              <span
                onClick={toggleInvModal}
                className="material-icons-outlined ic-cont"
              >
                person_add_alt
              </span>
            </Badge>
          </Col>
          <Col xs={2} md={2} className="d-flex ic-cont logout">
            <span
              onClick={handleLogOut}
              className="material-icons-outlined ic-cont"
            >
              logout
            </span>
          </Col>
        </Col>
      </Row>
      <InviteModal
        state={invModal}
        handleClose={toggleInvModal}
        invitations={Invitations}
        updateSent={setInvitations}
        room={room}
        name={name}
      />
    </div>
  );
}

export default Header;
