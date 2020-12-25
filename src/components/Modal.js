import React from "react";
import ReactDOM from "react-dom";

const Modal = (props) => {
  let { title, content, actions, dismissAction } = props;
  return ReactDOM.createPortal(
    <div onClick={dismissAction} className="ui dimmer modals visible active">
      <div
        onClick={(e) => e.stopPropagation()}
        className="ui standard modal visible active"
      >
        <div className="header">{title}</div>
        <div className="content">{content}</div>
        <div className="actions">{actions}</div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
