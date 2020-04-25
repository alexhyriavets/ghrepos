import React from 'react';

type PropTypes = {
  name: string
  description: string
  forksCount?: number
  starsCount?: number
  onClick?: () => void
};

export const Repo: React.FC<PropTypes> = ({ name, description, forksCount, starsCount, onClick }) => (
  <button type='button' className="card repoCard" onClick={onClick}>
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
  </button>
);