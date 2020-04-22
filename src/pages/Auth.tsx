import React, { useEffect } from 'react';
import axios from 'axios';
import { useLocation, useHistory } from 'react-router-dom';
import { getRequestAuthUrl, fetchAccessToken } from '../services/AuthService';
import { LocalStorageService, LocalStorage } from '../services/LocalStorageService';

const localStorageService = new LocalStorageService(window.localStorage as LocalStorage);

export const Auth = () => {
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');

    if (!code) {
      return;
    }
    
    async function getAccessToken() {
      const { accessToken } = await fetchAccessToken(code as string);

      localStorageService.set('accessToken', accessToken);
      axios.defaults.headers.common.Authorization = `token ${accessToken}`;
      history.push('/');
    }

    getAccessToken();
  }, [location, history]);

  return (
    <div className="container">
      <div className="row">
        <div className="col s5 offset-s3">
          <div className="card pt-4">
            <div className="card-content">
              <span className="card-title center">Auth</span>
            </div>

            <div className="card-action center">
              <a
                href={getRequestAuthUrl()}
                className="waves-effect waves-light btn-large"
              >
                GH Auth
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
