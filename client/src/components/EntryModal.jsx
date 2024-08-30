// components/EntryModal.js
import React from 'react';

const EntryModal = ({weddingData, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Welcome to the Walimatul Urus</h2>
        <h5>{weddingData.groom_name}</h5>
        <p className='mt-2'>&</p>
        <h5>{weddingData.bride_name}</h5>
        <p>We hope you have a great time!</p>
        <button className='btn btn-primary' onClick={onClose}>Enter</button>
      </div>
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          left: 15%;
          height: 100%;
          width: 70%;
          // background: rgba(0, 0, 0, 0.5);
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
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
};

export default EntryModal;
