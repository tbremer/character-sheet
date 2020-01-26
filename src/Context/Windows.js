import React from 'react';
import guuid from '../lib/guuid';

export const WindowsContext = React.createContext();

export function WindowsProvider({ children }) {
  const [windows, setWindows] = React.useState([]);
  const api = {
    windows,
    removeWindow(id) {
      setWindows(
        windows.reduce((all, curr) => {
          if (curr.id !== id) all.push(curr);

          return all;
        }, [])
      );
    },
    addWindow(windowObj) {
      setWindows([...windows, { ...windowObj, id: guuid() }]);
    },
  };
  return <WindowsContext.Provider value={api}>{children}</WindowsContext.Provider>;
}

{
  /* function reducer(windows, action) {
  switch (action.type) {
    case 'push': {
      return [...windows, action.window];
    }
    case 'pluck': {
      return windows.reduce((all, curr) => {
        if (curr.id !== action.id) all.push(curr);

        return all;
      }, []);
    }
    default: {
      throw new Error(`Unknown action type: ${action.type}`);
    }
  }
}

function useWindows() {
  const [windows, dispatch] = React.useReducer(reducer, []);
  function addWindow(w) {
    dispatch({ type: 'push', window: w });
  }
  function removeWindow(id) {
    dispatch({ type: 'pluck', id });
  }
  return { windows, addWindow, removeWindow, dispatch };
} */
}
