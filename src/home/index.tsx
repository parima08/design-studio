import React from 'react';
//import { createUseStyles } from 'react-jss';
import GapiApi from '../auth/GapiApi';
import { useCookies } from 'react-cookie';

import logo from '../logo.svg';


//const useStyles = createUseStyles({});

interface HomeProps {}

export default function Home({
}: HomeProps) {
  const [cookies, _, removeCookie] = useCookies(['login']);

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