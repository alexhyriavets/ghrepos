import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Auth } from './pages/Auth';
import { Home } from './pages/Home';
import { ProtectedRoute } from './components/ProtectedRoute';

export const App = () => {
  const authenticated = useSelector(state => state.Auth.authenticated);

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