/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { fetchRepos } from '../services/ReposService';
import { ReposList } from '../components/ReposList';
import { Repo } from '../components/Repo';

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
  const [searchText, setSearchText] = useState<string>('a');
  const [sortBy, setSortBy] = useState<string>(sortOptions[0].value);

  async function doSearch() {
    const { repos: reposResponse } = await fetchRepos({
      query: searchText,
      sort: sortBy
    });

    setRepos(reposResponse);
  }

  async function loadMoreRepos(page: number) {
    console.log('start fetch');
    const { repos: newRepos } = await fetchRepos({
      query: searchText,
      sort: sortBy,
      page
    });
    console.log('end fetch');

    setRepos(prevRepos => [...prevRepos, ...newRepos]);
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

          <ReposList>
            <InfiniteScroll
              pageStart={1}
              loadMore={loadMoreRepos}
              hasMore
              loader={<div className="loader" key={0}>Loading ...</div>}
            >
              {repos.map(repo => (
                <Repo 
                  key={repo.id}
                  name={repo.name}
                  description={repo.description}
                />
              ))}
            </InfiniteScroll>
          </ReposList>

        </div>
      </div>
    </div>
  );
};