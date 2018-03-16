import React from 'react';
import './index.css';

const Card = ({ children, color }) => (
  <div className="card" style={{ color, borderColor: color }}>
    <div className="content">
      {children}
    </div>
  </div>
);

export default Card;
