import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getRequestAuthUrl } from '../services/AuthService';
import { getAccessToken } from '../redux/actions/auth';

export const Auth = () => {
  const authenticated = useSelector(state => state.Auth.authenticated);
  const dispatch = useDispatch();

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');

    if (!code) {
      return;
    }

    dispatch(getAccessToken(code));
  }, [history, location, dispatch]);

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

      <div id="modal1" className="modal open">
        <div className="modal-content">
          <h4>Modal Header</h4>
          <p>A bunch of text</p>
        </div>
        <div className="modal-footer">
          <a href="#!" className="modal-close waves-effect waves-green btn-flat">Agree</a>
        </div>
      </div>
    </div>
  );
};