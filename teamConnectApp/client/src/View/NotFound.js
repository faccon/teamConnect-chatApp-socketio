import React from 'react'
import { ToastContainer } from 'react-toastify'
import { Container, Col, Row } from 'react-bootstrap'
import { SocialIcon } from 'react-social-icons'
import { GITHUB_URL, LINKEDIN, MAILTO } from '../shared'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router'
import Brand from '../Components/Brand'

function NotFound() {
  const navigate = useNavigate()

  return (
    <Container className="main-container">
      <Row className="inner-container">
        <Col md={6} className="d-none d-md-block">
          <div className="left-container "></div>
        </Col>
        <Col md={6} className="align-self-center tes1 right-container">
          <Brand />
          <Col className="d-flex justify-content-center">
            <img src="images/404.png" alt="404" width="80%" />
          </Col>
          <Col className="d-flex justify-content-center">
            <p className="not-found">PAGE NOT FOUND </p>
          </Col>
          <Col className="d-flex justify-content-center">
            <Button
              color="secondary"
              onClick={() => navigate('/')}
              startIcon={<span class="material-icons">home</span>}
              variant="outlined"
            >
              HOME
            </Button>
          </Col>
          <Col xs={{ offset: 3, span: 6 }} className="bottom-flags mt-5">
            <SocialIcon
              className="icons"
              target="_blank"
              rel="noopener noreferrer"
              fgColor="black"
              bgColor="whitesmoke"
              url={LINKEDIN}
            />
            <SocialIcon
              className="icons"
              target="_blank"
              rel="noopener noreferrer"
              fgColor="black"
              bgColor="whitesmoke"
              url={GITHUB_URL}
            />
            <SocialIcon
              className="icons"
              target="_blank"
              rel="noopener noreferrer"
              fgColor="black"
              bgColor="whitesmoke"
              url={MAILTO}
            />
          </Col>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  )
}

export default NotFound
