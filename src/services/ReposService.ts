import axios from 'axios';

export const fetchRepos = async () => {
  const { data } = await axios.get('https://api.github.com/user/repos');

  return data;
};

export const searchRepos = async (searchOptions: any) => {
  const {
    query,
    sort = 'updated',
    order = 'asc',
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
    repos: data.items
  };
};