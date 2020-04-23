import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Auth } from './pages/Auth';
import { Home } from './pages/Home';
import { ProtectedRoute } from './components/ProtectedRoute';

const AppLocal = ({ authenticated }: any) => {
  return (
    <div className="app">
      <Router>
        <ProtectedRoute 
          path="/"
          component={Home}
          exact
          authenticated={authenticated}
        />
        <Route 
          path="/auth"
          component={Auth}
          exact
        />
      </Router>
    </div>
  );
};

const mapStateToProps = state => ({
  authenticated: state.Auth.authenticated
});

export const App = connect(mapStateToProps, null)(AppLocal);