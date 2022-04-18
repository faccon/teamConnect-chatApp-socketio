import { Box, Chip, Divider, Grid, Modal } from "@mui/material";
import React, { useState } from "react";
import { Col } from "react-bootstrap";
import { useStyles } from "../shared";
import LoadingButton from "./LoadingButton";

function InviteModal({
  state,
  handleClose,
  updateSent,
  invitations,
  room,
  name,
}) {
  const styles = useStyles();
  const [, setMode] = useState("");
  const [to, setTo] = useState("");
  const [recipient, setRecipient] = useState();
  const [sending, setSending] = useState("");

  const sendInvite = async () => {
    setSending("sending");
    await fetch("http://127.0.0.1:5001/send/template/invite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({
        to,
        sender: name,
        recipient,
        url: `http://localhost:3000/invite/${room}`,
      }),
    })
      .then(() => {
        setSending("sent");
        updateSent([...invitations, recipient]);
        setTimeout(() => {
          handleClose();
          setSending("");
        }, 2000);
      })
      .catch((err) => {
        setSending("error");
      });
  };

  const handleChange = (event) => {
    setMode(event.target.value);
  };

  return (
    <Modal
      style={{
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        alignItems: "center",
        display: "flex",
      }}
      open={state}
      onClose={handleClose}
    >
      <Box className={styles.box}>
        <Grid container justifyContent="center" spacing={2}>
          {/* Visible on below md devices */}
          <Col xs={10} className="d-block d-md-none">
            <span>Sent Invitations</span>
            <Divider sx={{ color: "white", borderWidth: "2" }} />
            <div className="sent-iv-md">
              {invitations && invitations.length > 0 ? (
                invitations.map((item, i) => {
                  return (
                    <Chip
                      key={i}
                      label={item}
                      color="primary"
                      variant="outlined"
                      sx={{ marginRight: "0.3rem" }}
                      icon={
                        <span className="iv-icon material-icons-outlined">
                          check_circle_outline
                        </span>
                      }
                    />
                  );
                })
              ) : (
                <span>No invitations sent yet!</span>
              )}
            </div>
          </Col>

          {/* Mode */}
          <Grid item xs={10}>
            <select
              className="form-select form-select-md mb-1 input"
              onChange={handleChange}
            >
              <option value="Email">Email</option>
            </select>
          </Grid>

          {/* Email */}
          <Grid item xs={10}>
            <div class="mb-1">
              <label for="email" class="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control input"
                placeholder="Enter email"
                onChange={(event) => setTo(event.target.value)}
              ></input>
            </div>
          </Grid>

          {/* Name */}
          <Grid item xs={10}>
            <div class="mb-1">
              <label for="name" class="form-label">
                Name
              </label>
              <input
                type="name"
                className="form-control input"
                placeholder="Nickname"
                onChange={(event) => setRecipient(event.target.value)}
              ></input>
            </div>
          </Grid>

          {/* Send */}
          <Grid
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
            item
            xs={10}
          >
            <LoadingButton state={sending} action={sendInvite} />
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}

export default InviteModal;
