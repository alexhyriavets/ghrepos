import { useState, useEffect } from 'react';

import { fetchRepos } from '../services/ReposService';
import { Repo } from '../types';

type ParamsType = {
  query: string
  sort: string
  page: number
};

export const useReposSearch = ({ query, sort, page }: ParamsType) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    if (!query) {
      return;
    }

    setLoading(true);
    setError(false);

    fetchRepos({ query, page, sort })
      .then(({ repos: newRepos, hasMore: newHasMore }) => {
        setRepos(newRepos);
        setHasMore(newHasMore);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, sort]);

  useEffect(() => {
    if (!query) {
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    setRepos([]);
  }, [query]);


  return { loading, error, repos, hasMore };
};