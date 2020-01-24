import React from 'react';
import { render } from 'react-dom';
import AppLoading from './Components/AppLoading';
import Router, { Route, RouterContext } from './Components/Router';
import { auth } from './firebase';

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
      <Route path="/~">
        <header className="menu-background pb-1 px-2 flex justify-between items-center">
          <div className="js-menu-contanier">
            <button className="js-menu-trigger font-medium p-2" type="button" id="file">
              <span className="pointer-events-off border-solid border-b-2 border-gray-900">F</span>ile
            </button>
            <div className="js-menu window" style={{ display: 'none' }}>
              <button type="button" className="js-menu-item">
                New<span className="text-xl">&blacktriangleright;</span>
              </button>
              <button type="button" className="js-menu-item">
                Open
              </button>
            </div>
          </div>

          <button
            className="btn:focus font-medium p-2"
            type="button"
            onClick={() => {
              auth.signOut().then(() => window.history.pushState(null, null, '/login'));
            }}
          >
            <span className="pointer-events-off border-solid border-b-2 border-gray-900">S</span>ign Out
          </button>
        </header>
      </Route>

      {/* <Route fallthrough>Oh no! we 404'd.</Route> */}
    </>
  );
}

render(
  <Router>
    <App />
  </Router>,
  app
);
