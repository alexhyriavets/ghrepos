import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Auth } from './pages/Auth';
import { Home } from './pages/Home';
import { ProtectedRoute } from './components/ProtectedRoute';
import { RootState } from './redux/rootReducer';

export const App = () => {
  const authenticated = useSelector((state: RootState) => state.auth.authenticated);

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