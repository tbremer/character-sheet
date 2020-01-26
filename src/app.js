import React from 'react';
import { render } from 'react-dom';
import AppLoading from './Components/AppLoading';
import Router, { Route, RouterContext } from './Components/Router';
import Home from './Components/Home';
import { auth } from './firebase';
import { WindowsProvider } from './Context/Windows';
import { PlayerProvider } from './Context/Player';

const worker = new Worker('./worker.js');

const app = document.getElementById('app');

function Authenticate() {
  React.useEffect(() => {
    const email = window.localStorage.getItem('emailForSignIn');
    auth.signInWithEmailLink(email, window.location.href).then(user => {
      window.localStorage.removeItem('emailForSignIn');

      window.history.pushState(null, null, '/~');
    });
  }, []);

  return 'Authing…';

  return null;
}

function App() {
  const [isLoading, setLoading] = React.useState(true);
  const location = React.useContext(RouterContext);

  React.useEffect(() => {
    worker.addEventListener('message', ({ data: action }) => {
      switch (action.type) {
        case 'LOGGED_IN_USER': {
          window.history.pushState(null, null, '/~');
          setLoading(false);
          break;
        }
        case 'NO_USER': {
          if (/^\/authenticate/.test(location) === false) window.history.pushState(null, null, '/login');
          setLoading(false);
          return;
        }
        default:
          console.info(`No case for type ${action.type} with data: ${JSON.stringify(action)}`);
          return;
      }
    });
  }, []);

  if (isLoading) return <AppLoading />;

  return (
    <>
      <Route path="/login">
        <form
          onSubmit={evt => {
            evt.preventDefault();
            const elem = evt.target.elements.email;

            const url =
              process.env.NODE_ENV === 'development'
                ? 'http://localhost:1234/authenticate'
                : 'https://dungeon.tbremer.com/authenticate';
            const actionCodeSettings = { url, handleCodeInApp: true };

            auth.sendSignInLinkToEmail(elem.value, actionCodeSettings).then(d => {
              window.localStorage.setItem('emailForSignIn', elem.value);
              alert('check your damn email');
            });
          }}
        >
          <label>
            <span>Email Address:</span>
            <br />
            <input type="email" name="email" />
          </label>

          <br />
          <br />
          <button type="submit">Sign In</button>
        </form>
      </Route>
      <Route path="/authenticate" exact={false}>
        <Authenticate />
      </Route>
      <Route path="/~" children={<Home />} />

      {/* <Route fallthrough>Oh no! we 404'd.</Route> */}
    </>
  );
}

render(
  <Router>
    <WindowsProvider>
      <PlayerProvider>
        <App />
      </PlayerProvider>
    </WindowsProvider>
  </Router>,
  app
);
