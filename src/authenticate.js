import { auth } from './firebase';

document.addEventListener('DOMContentLoaded', function() {
  const email = window.localStorage.getItem('emailForSignIn');
  auth.signInWithEmailLink(email, window.location.href).then(user => {
    window.localStorage.removeItem('emailForSignIn');

    if (process.env.NODE_ENV === 'development') window.location = '/home.html';
    else window.location = '/~';
  });
});
