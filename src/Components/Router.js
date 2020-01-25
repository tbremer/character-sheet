import React from 'react';
import PropTypes from 'prop-types';
const ogPush = window.history.pushState.bind(window.history);

export const RouterContext = React.createContext();

export function Route({ path, children, exact, fallthrough }) {
  /**
   * @var  {string}
   */
  const url = React.useContext(RouterContext);

  if (path && exact && url === path) return children;
  if (path && !exact & (url.substring(0, path.length) === path)) return children;
  if (fallthrough) return children;

  return null;
}

Route.propTypes = {
  path: function(props, propName, componentName) {
    if (!props.path && !props.fallthrough) {
      return new Error(
        'A Route either needs to have a `path` or be the `fallthrough` route. Error occured in:' + componentName
      );
    }
  },
  children: PropTypes.node.isRequired,
  exact: PropTypes.bool,
  fallthrough: PropTypes.bool,
};

Router.defaultProps = {
  path: '',
  exact: true,
  fallthrough: false,
};

export default function Router({ children }) {
  const [url, setUrl] = React.useState(window.location.pathname);
  React.useEffect(() => {
    window.history.pushState = function History$$PushOverride(data, title, url) {
      ogPush(data, title, url);
      setUrl(url);
    };
  }, []);

  return <RouterContext.Provider value={url}>{children}</RouterContext.Provider>;
}
