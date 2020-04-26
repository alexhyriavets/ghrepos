import axios from 'axios';

const REDIRECT_URL = process.env.REACT_APP_REDIRECT_URL
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
// const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET
const NODE_API_URL = process.env.REACT_APP_NODE_API_URL || ``

export const setAuthorizationHeader = (accessToken: string | null) => {
  if (accessToken) {
    axios.defaults.headers.common.Authorization = `token ${accessToken}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

export const getRequestAuthUrl = () => {
  const base = 'https://github.com/login/oauth/authorize';

  return `${base}/?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}`;
};

export const fetchAccessToken = async (code: string) => {
  //  const { data } = await axios.post('https://github.com/login/oauth/access_token', {
  //   client_id: CLIENT_ID,
  //   client_secret: CLIENT_SECRET,
  //   code,
  // })
  const { data } = await axios.get(`${NODE_API_URL}access_token`, {
    params: {
      code
    }
  })

  return {
    accessToken: data.access_token as string
  };
};