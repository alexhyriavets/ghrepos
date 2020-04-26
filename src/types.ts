export type Repo = {
  id: number
  url: string
  name: string
  description: string
  html_url: string
  forks_count?: number
  stargazers_count?: number
};

export type SortOption = {
  name: string,
  value: string
};