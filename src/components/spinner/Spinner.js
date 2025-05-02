// Spinner.js
import React from 'react';
import { Spinner as BootstrapSpinner } from 'react-bootstrap';
import './Spinner.css';

const Spinner = () => {
  return (
    <div className="spinner-container">
      <BootstrapSpinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </BootstrapSpinner>
    </div>
  );
};

export default Spinner;
