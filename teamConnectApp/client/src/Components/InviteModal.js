import { Box, Grid, Modal } from "@mui/material";
import React, { useState } from "react";
import LoadingButton from "./LoadingButton";

function InviteModal({
  state,
  handleClose,
  updateSent,
  invitaions,
  room,
  name,
}) {
  const [Mode, setMode] = useState("");
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
        updateSent([...invitaions, recipient]);
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
      <Box
        sx={{
          width: "50%",
          height: "50%",
          color: "white",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          backgroundColor: "black",
          borderRadius: "10px",
        }}
      >
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={10} md={8}>
            {/* Mode */}
            <select
              className="form-select form-select-md mb-3 input"
              onChange={handleChange}
            >
              <option value="Email">Email</option>
            </select>

            {/* Mode */}
            <Grid item xs={12}>
              <div class="mb-3">
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
            <Grid item xs={12}>
              <div class="mb-3">
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
              xs={12}
            >
              <LoadingButton state={sending} action={sendInvite} />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}

export default InviteModal;
