import React from "react";
import "./modal.css";
const Modal = ({ message, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <p>{message}</p>
        <button className="modal-button" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
};

export default Modal;
