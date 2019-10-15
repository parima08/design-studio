import React from 'react'
import Script from 'react-load-script';
import { loggedIn } from '../redux/actions';

declare var gapi : any;

const Auth = () => {

  const handleSignIn = () => {
    gapi.load('auth2', () => {
      const auth2 = gapi.auth2.init({client_id: '213328197517-079p7u328erbifqllrsimnhi3phsdos9'});
      auth2.signIn().then( () => {
        loggedIn();
      })
    });
  }

  return(
    <>
      <Script
        type='text/javascript'
        url={'https://apis.google.com/js/platform.js'}
      />
      <div className = "login-page">
        <div className = "login-box">
          <div className = "login-logo-box">
          <div className = "login-logo">
            {false && <img src = "../img/logos/centered/white_text/general.png" />}
          </div>
        </div>
          <h1>Welcome!</h1>
          <p>Please login using your shrimadrajchandramission.org email id:</p>
          <div className="g-signin2" data-onsuccess="onSignIn"></div>
          <button onClick={handleSignIn}>Sign in</button>
        </div> 
      </div>
    </>
  )
}

export default Auth;