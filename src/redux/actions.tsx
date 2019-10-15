import store from './store';

export const loggedIn = () => {
  store.dispatch({type: 'LOGGED_IN'});
}