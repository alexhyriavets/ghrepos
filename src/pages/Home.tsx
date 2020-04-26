/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef, useCallback } from 'react';
import { ReposList } from '../components/Repos/ReposList';
import { Repo } from '../components/Repos/Repo';
import { useReposSearch } from '../hooks/useReposSearch';
import { useDebounce } from '../hooks/useDebounce';
import { RepoModal } from '../components/Repos/RepoModal';
import { SortSelect } from '../components/Repos/SortSelect';
import { SortOption } from '../types';

const sortOptions: SortOption[] = [
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
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState(sortOptions[0].value);
  const [page, setPage] = useState(0);

  const [openedRepoUrl, setOpenedRepoUrl] = useState('');

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
        setPage(prevPage => prevPage + 1);
      }
    });

    if (node) {
      observer.current.observe(node);
    }
  }, [loading, hasMore]);

  function repoModalCloseHandler() {
    setOpenedRepoUrl('');
  }

  function openRepoModal(url: string) {
    setOpenedRepoUrl(url);
  }

  function handleSearchChange(event) {
    setQuery(event.target.value);
    setPage(1);
  }

  return (
    <div className="container home">
      <div className="row">
        <div className="col s3">
          <SortSelect options={sortOptions} onChange={setSort} />
        </div>

        <div className="col s10 offset-s1">
          <div className="input-field">
            <input 
              id="search"
              className="validate"
              placeholder='Search'
              onChange={handleSearchChange}
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
                    forksCount={repo.forks_count}
                    onClick={() => openRepoModal(repo.html_url)}
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
                    onClick={() => openRepoModal(repo.html_url)}
                  />
                </div>   
              ))}
          </ReposList>
          <div>{loading && 'Loading...'}</div>
          <div>{error && 'Error'}</div>
        </div>
      </div>


      {openedRepoUrl && <RepoModal url={openedRepoUrl} onClose={repoModalCloseHandler} />}
    </div>
  );
};