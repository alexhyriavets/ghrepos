import React, { ReactNodeArray } from 'react';

type PropTypes = {
  children: ReactNodeArray
};

export const ReposList: React.FC<PropTypes> = ({ children }) => (
  <div>{ children }</div>
);