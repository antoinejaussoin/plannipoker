import React from 'react';
import './index.css';

const Card = ({ children }) => (
  <div className="card">
    <div className="content">
      {children}
    </div>
  </div>
);

export default Card;
