import React from 'react';

import { WindowsContext } from '../Context/Windows';
import NewSpell from './NewSpell';
import GuiWindow from './GuiWindow';

function guuid() {
  let d = Date.now();
  return /*const uuid =*/ 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
}

export default function Home() {
  const [playerState, setPlayerState] = React.useState({ spells: null, ac: null, abilityScores: [] });
  const { windows, addWindow, removeWindow } = React.useContext(WindowsContext);
  const [fileMenuOpen, setfileMenuOpen] = React.useState(false);
  function showFileMenu() {
    setfileMenuOpen(!fileMenuOpen);
  }

  const [newMenuOpen, setNewMenu] = React.useState(false);
  function showNewMenu() {
    setNewMenu(!newMenuOpen);
  }

  return (
    <>
      <header className="menu-background pb-1 px-2 flex justify-between items-center">
        <div className="menu-contanier">
          <button
            onClick={showFileMenu}
            className={`font-medium p-2 ${fileMenuOpen && 'menu-trigger open'}`}
            type="button"
          >
            <span className="pointer-events-off border-solid border-b-2 border-gray-900">F</span>ile
          </button>
          <div className="window menu" style={{ display: fileMenuOpen ? 'block' : 'none' }}>
            <div className="menu-item menu-contanier" onMouseEnter={showNewMenu} onMouseLeave={showNewMenu}>
              New<span className="text-xl">&#x25B6;</span>
              <div className="window menu menu--submenu" style={{ display: newMenuOpen ? 'block' : 'none' }}>
                <button
                  type="button"
                  className="menu-item"
                  onClick={() => {
                    showFileMenu();
                    addWindow({ id: guuid(), children: <NewSpell />, title: 'New Spell', height: '320px' });
                  }}
                >
                  Spell
                </button>
              </div>
            </div>

            <button
              type="button"
              className={`menu-item ${false && 'pointer-events-off menu-item--disabled'}`}
              onClick={() => {
                showFileMenu();
                addWindow({
                  id: guuid(),
                  children: 'Inside',
                  title: 'Open',
                  minWidth: '600px',
                });
              }}
            >
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
      {windows.map(({ id, ...rest }) => (
        <GuiWindow key={id} closeDialog={() => removeWindow(id)} {...rest} />
      ))}
    </>
  );
}
