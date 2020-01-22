import { auth, app } from './firebase';

document.addEventListener('DOMContentLoaded', function() {
  auth.onAuthStateChanged(function(currentUser) {
    if (currentUser) {
      window.location = '/~';
    } else {
      const a = document.getElementById('auth');
      const l = document.getElementById('loading');

      a.style.display = 'block';
      l.style.display = 'none';

      a.addEventListener('submit', e => {
        e.preventDefault();
        const elem = a.elements.email;
        const url = /localhost/.test(location)
          ? 'http://localhost:1234/authenticate.html'
          : 'https://dungeon.tbremer.com/authenticate';
        const actionCodeSettings = { url, handleCodeInApp: true };

        auth.sendSignInLinkToEmail(elem.value, actionCodeSettings).then(d => {
          window.localStorage.setItem('emailForSignIn', elem.value);
          const node = document.createElement('div');

          node.textContent = 'We have emailed you a link to sign in at: ' + elem.value;
          a.parentElement.insertBefore(node, a);
          a.parentElement.removeChild(a);
        });
      });
    }
  });
});
