import React from 'react'
import { useCookies } from 'react-cookie';
import GapiApi from './GapiApi';


export default function Auth(){
  const [_, setCookie] = useCookies(['login']);
  
  async function handleSignIn(){
    const cb = () => setCookie('login', true, {path: '/'});
    GapiApi.shared.signIn(cb);
  }

  return(
    <>
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

