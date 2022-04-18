import React from "react";
import { Spinner } from "react-activity";
import "react-activity/dist/library.css";

function LoadingButton({ state, action, className, spinnerColor }) {
  if (state === "sending") {
    return (
      <button className={className ? className : ""} onClick={action}>
        <Spinner className="spinner" color={spinnerColor ? spinnerColor : 'white'} size={12} />
        Send
      </button>
    );
  } else if (state === "sent") {
    return (
      <button className={className ? className : ""} onClick={action}>
        <span className="success material-icons-outlined">
          check_circle_outline
        </span>
        Sent
      </button>
    );
  } else {
    return (
      <button className={className ? className : ""} onClick={action}>
        Send
      </button>
    );
  }
}

export default LoadingButton;
