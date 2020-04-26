import { useState, useEffect } from 'react';

import { fetchRepos } from '../services/ReposService';
import { Repo } from '../types';

type ParamsType = {
  query: string
  sort: string
  page: number
};

export const useReposSearch = ({ query, sort, page }: ParamsType) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setRepos([]);
  }, [query]);

  useEffect(() => {
    if (!query) {
      setLoading(false);

      return;
    }
    
    setLoading(true);
    setError(false);


    fetchRepos({ query, page, sort })
      .then(({ repos: newRepos, hasMore: newHasMore }) => {
        setRepos(prevRepos => [...prevRepos, ...newRepos]);
        setHasMore(newHasMore);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [query, page, sort]);

  return { loading, error, repos, hasMore };
}; 