import React from 'react';

export const Repo = ({ name, description }: any) => (
  <div className="card">
    <div className="card-content">
      <span className="card-title">{ name }</span>
      <p>{ description }</p>
    </div>
  </div>
);