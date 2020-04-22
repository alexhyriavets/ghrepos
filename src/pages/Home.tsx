/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { searchRepos } from '../services/ReposService';

const sortOptions = [
  {
    name: 'Stars',
    value: 'stars'
  },
  {
    name: 'Forks',
    value: 'forks'
  }
];

export const Home = () => {
  const [repos, setRepos] = useState<any>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>(sortOptions[0].value);

  async function doSearch() {
    const { repos: reposResponse } = await searchRepos({
      query: searchText,
      sort: sortBy
    });

    setRepos(reposResponse);
  }  

  return (
    <div className="container">
      <div className="row">
        <div className="col s3">
          <div className="input-field">
            Sort by:
            <select 
              id="sortSelect"
              defaultValue={sortOptions[0].value}
              className="browser-default"
              onChange={e => setSortBy(e.target.value)}
            >
              {sortOptions.map(sortOption => (
                <option
                  key={sortOption.value}
                  value={sortOption.value}
                >
                  {sortOption.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="col s10 offset-s1">
          <div className="input-field">
            <input 
              id="search"
              className="validate"
              onChange={e => setSearchText(e.target.value)}
            />
            <label htmlFor="search">Search</label>
          </div>

          <button 
            type='button'
            className="waves-effect waves-light btn-large"
            onClick={doSearch}
          >
            Search
          </button>

          {repos.map(repo => (
            <p key={repo.id}>{repo.name}</p>
          ))}
        </div>
      </div>
    </div>
  );
};