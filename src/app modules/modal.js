import React from 'react';
import './app_modules.css'; // Dark-themed modal CSS

const Modal = ({ children, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        {children}
      </div>
    </div>
  );
};

export default Modal;