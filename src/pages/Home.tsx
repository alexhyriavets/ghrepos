/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef, useCallback } from 'react';
import { ReposList } from '../components/ReposList';
import { Repo } from '../components/Repo';
import { useReposSearch } from './useReposSearch';
import { useDebounce } from '../hooks/useDebounce';

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

const DEBOUNCE_TIMEOUT = 400;

export const Home = () => {
  const [query, setQuery] = useState('a');
  const [sort, setSort] = useState(sortOptions[0].value);
  const [page, setPage] = useState(1);

  const debouncedQuery = useDebounce(query, DEBOUNCE_TIMEOUT);
  
  const {
    repos,
    hasMore,
    loading,
    error
  } = useReposSearch({ query: debouncedQuery, sort, page });

  const observer = useRef<any>();
  
  const lastRepoRef = useCallback(node => {
    if (loading) return;
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage=> prevPage + 1);
      }
    });

    if (node) {
      observer.current.observe(node);
    }
  }, [loading, hasMore]);

  return (
    <div className="container">
      <div className="row">
        <div className="col s3">
          <div className="input-field">
            <select
              id="sortSelect"
              defaultValue={sortOptions[0].value}
              className="browser-default"
              onChange={e => setSort(e.target.value)}
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
              placeholder='Search'
              onChange={e => setQuery(e.target.value)}
            />
          </div>

          <ReposList>
            {repos.map((repo, index) => 
              repos.length === index + 1 ? (    
                // eslint-disable-next-line react/no-array-index-key
                <div ref={lastRepoRef} key={repo.id + index}>
                  <Repo 
                    name={repo.name}
                    description={repo.description}
                    starsCount={repo.stargazers_count}
                    forksCount={repo.forksCount}
                  />
                </div>            
              ) : (      
                // eslint-disable-next-line react/no-array-index-key
                <div key={repo.id + index}>
                  <Repo 
                    name={repo.name}
                    description={repo.description}
                    starsCount={repo.stargazers_count}
                    forksCount={repo.forks_count}
                  />
                </div>   
              ))}
          </ReposList>
          <div>{loading && 'Loading...'}</div>
          <div>{error && 'Error'}</div>
        </div>
      </div>
    </div>
  );
};