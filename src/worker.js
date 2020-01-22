import * as firebase from './firebase';

firebase.auth.onAuthStateChanged(function(currentUser) {
  if (currentUser) self.postMessage({ type: 'LOGGED_IN_USER', user: currentUser.toJSON() });
  else self.postMessage({ type: 'NO_USER', data: {} });
});
