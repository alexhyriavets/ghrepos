import React from 'react';

type PropTypes = {
  name: string
  description: string
  forksCount?: number
  starsCount?: number
};

export const Repo: React.FC<PropTypes> = ({ name, description, forksCount, starsCount }) => (
  <div className="card">
    <div className="card-content">
      <span className="card-title">{ name }</span>
      <p>{ description }</p>

      <br />
      <br />
      
      <div>
        <b>Forks:</b>
        {forksCount || 0} 
        <br />
        <b>Stars:</b>
        {starsCount || 0}
      </div>
    </div>
  </div>
);