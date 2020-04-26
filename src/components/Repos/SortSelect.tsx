import React from 'react';
import { SortOption } from '../../types';

type PropTypes = {
  options: SortOption[]
  onChange: (optionValue: SortOption['value']) => void
};

export const SortSelect: React.FC<PropTypes> = ({ options, onChange }) => {
  return (
    <div className="input-field">
      <select
        id="sortSelect"
        defaultValue={options[0].value}
        className="browser-default"
        onChange={e => onChange(e.target.value)}
      >
        {options.map(sortOption => (
          <option
            key={sortOption.value}
            value={sortOption.value}
          >
            {sortOption.name}
          </option>
        ))}
      </select>
    </div>
  );
};