import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { getRequestAuthUrl } from '../services/AuthService';
import { getAccessToken } from '../redux/actions/auth';

const AuthLocal = ({ getAccessToken: getToken, authenticated }: any) => {
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');

    if (!code) {
      return;
    }

    getToken(code);
  }, [getToken, history, location]);

  useEffect(() => {
    if (authenticated) {
      history.push('/');
    }
  }, [history, authenticated]);

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

const mapDispatchToProps =  {
  getAccessToken
};

const mapStateToProps = state => ({
  authenticated: state.Auth.authenticated
});

export const Auth = connect(mapStateToProps, mapDispatchToProps)(AuthLocal);