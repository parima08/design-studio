import React from 'react';
import logo from './logo.svg';
import './App.css';
import Auth from './auth';
import { useCookies } from 'react-cookie';
import GapiApi from './auth/GapiApi';

declare var gapi : any;

const App: React.FC = () => {
  const [cookies, _, removeCookie] = useCookies(['login']);
  
  if(!cookies.login){
    return <Auth />
  }

  const handleSignOut = () => {
    const cb = () => removeCookie('login');
    GapiApi.shared.signOut(cb);
  }

  return (
    <>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Parima's App - does this work?asdf
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <button onClick={handleSignOut}>
          Log out
        </button>
      </div>
    </>
  );
}

export default App;
