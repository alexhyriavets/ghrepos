import React from 'react';

type PropTypes = {
  children: HTMLElement
};

export const ReposList: React.FC<PropTypes> = ({ children }) => (
  <div>{ children }</div>
);