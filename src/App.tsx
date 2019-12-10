import React from 'react';
import './App.css';
import Auth from './auth';
import { useCookies } from 'react-cookie';
import { withRouter, Switch } from 'react-router';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Home from './home';
import AssetList from './assetList';


const App: React.FC = () => {
  const [cookies] = useCookies(['login']);

  if(!cookies.login){
    return <Auth />
  }

  return (
    <Router>
      <Switch>
        <Route 
          exact={true}
          path="/"
          component={Home}
        />
        <Route 
          path="/:assetName"
          component={AssetList}
        />
      </Switch>
    </Router>
  );
}

export default App;
