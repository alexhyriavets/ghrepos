import { useState, useEffect } from 'react';

import { fetchRepos } from '../services/ReposService';

export const useReposSearch = ({ query, sort, page }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [repos, setRepos] = useState<any>([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setRepos([]);
  }, [query]);

  useEffect(() => {
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