import axios from 'axios';

const redirectUrl = 'https://ghrepos-app.herokuapp.com/auth';
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET

export const setAuthorizationHeader = (accessToken: string | null) => {
  if (accessToken) {
    axios.defaults.headers.common.Authorization = `token ${accessToken}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

export const getRequestAuthUrl = () => {
  const base = 'https://github.com/login/oauth/authorize';

  return `${base}/?client_id=${CLIENT_ID}&redirect_uri=${redirectUrl}`;
};

export const fetchAccessToken = async (code: string) => {
   const { data } = await axios.post('https://github.com/login/oauth/access_token', {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code,
  })

  return {
    accessToken: data.access_token as string
  };
};