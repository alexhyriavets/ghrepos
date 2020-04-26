import axios from 'axios';

const clientId = '6d14161f0e268ed7c239';
const redirectUrl = 'http://localhost:3000/auth';



export const setAuthorizationHeader = (accessToken: string | null) => {
  if (accessToken) {
    axios.defaults.headers.common.Authorization = `token ${accessToken}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

export const getRequestAuthUrl = () => {
  const base = 'https://github.com/login/oauth/authorize';

  return `${base}/?client_id=${clientId}&redirect_uri=${redirectUrl}`;
};

export const fetchAccessToken = async (code: string) => {
  const { data } = await axios.get(`http://localhost:8080/access_token/?code=${code}`);

  return {
    accessToken: data.access_token as string
  };
};