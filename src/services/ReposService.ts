import axios from 'axios';
import { Repo } from '../types';

export type FetchReposParams = {
  query: string
  sort: string
  order?: string
  page?: number
  perPage?: number
};

export const fetchRepos = async (searchOptions: FetchReposParams) => {
  const {
    query,
    sort = 'stars',
    order = 'desc',
    page = 1,
    perPage = 15
  } = searchOptions;

  const { data } = await axios.get('https://api.github.com/search/repositories', {
    params: {
      q: query,
      sort,
      order,
      page,
      per_page: perPage
    }
  });

  return {
    repos: data.items as Repo[],
    hasMore: data.incomplete_results as boolean
  };
};