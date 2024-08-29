// components/EntryModal.js
import React from 'react';

const EntryModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Welcome to the Wedding Page!</h2>
        <p>We hope you have a great time!</p>
        <button onClick={onClose}>Enter</button>
      </div>
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 5px;
          text-align: center;
        }
        button {
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
};

export default EntryModal;
