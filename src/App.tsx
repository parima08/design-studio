import React from 'react';
import logo from './logo.svg';
import { useSelector } from 'react-redux';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { isLoggedInSelector } from './redux/selectors';
import Auth from './auth';


const App: React.FC = () => {
  const isLoggedIn = useSelector(isLoggedInSelector);
  console.log(isLoggedIn);
  
  if(!isLoggedIn){
    return <Auth />
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
      </div>
    </>
  );
}

export default App;
