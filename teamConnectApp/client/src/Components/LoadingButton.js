import React from 'react'
import PropTypes from 'prop-types'
import { Spinner } from 'react-activity'
import 'react-activity/dist/library.css'

function LoadingButton({ state, action }) {
  if (state === 'sending') {
    return (
      <button onClick={action}>
        <Spinner className="spinner" color="white" size={12} />
        Send
      </button>
    )
  } else if (state === 'sent') {
    return (
      <button onClick={action}>
        <span className="success material-icons-outlined">check_circle_outline</span>
        Sent
      </button>
    )
  } else {
    return <button onClick={action}>Send</button>
  }
}

export default LoadingButton
