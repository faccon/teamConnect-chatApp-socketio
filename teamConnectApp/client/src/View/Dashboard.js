import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { socket } from '../Model'
import { Button } from '@mui/material'

function Dashboard({ onlineUsers }) {
  const [Online, setOnline] = useState(null)

  useEffect(() => {
    socket.on('message', (res) => {
      setOnline(res.onlineUsers)
    })
  })

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
          <Col>
            <span className="online">Online:</span>
          </Col>
          <ul className="online-list-marker">
            {Online
              ? Online.map((item, index) => {
                  return <li id={index.toString()}>{item}</li>
                })
              : onlineUsers.map((item, index) => {
                  return <li id={index.toString()}>{item}</li>
                })}
          </ul>
        </Row>
        <Row className="mt-5">
          <Col md={12}>
            <span className="title">Cloud hosted chat application</span>
          </Col>
          <Col md={12}>
            <span className="notes">
              BackEnd with NodeJS, Socket.io & Express <br /> IBM Cloud <br />{' '}
              Instance: 2/2
            </span>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col md={12}>
            <span className="title">By: BABS</span>
          </Col>
          <Col md={12} className="mt-3">
            <Button size="small" color="secondary" variant="outlined">
              Invite to chat
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Dashboard
