import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import './index.css';
import App from './App';
import store from './redux/store'
import { CookiesProvider } from 'react-cookie';
import Script from 'react-load-script';


ReactDOM.render(
	<CookiesProvider>
		<Provider store={store}>
			<Script
					type='text/javascript'
					url={'https://apis.google.com/js/platform.js'}
				/>
				<App />
		</Provider>
	</CookiesProvider>,
	document.getElementById('root')
)

