import React from 'react';

import { WindowsContext } from '../Context/Windows';
import StickyNote from './StickyNote';
import NewSpell from './NewSpell';
import AbilityScore from './AbilityScore';
import GuiWindow from './GuiWindow';
import FileOpen from './FileOpen';
import { TrashLauncher } from './WasteBin';
import guuid from '../lib/guuid';

export default function Home() {
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
                    addWindow({ children: <NewSpell />, title: 'New Spell', height: '320px' });
                  }}
                >
                  Spell
                </button>

                <button
                  type="button"
                  className="menu-item"
                  onClick={() => {
                    showFileMenu();
                    addWindow({ children: <AbilityScore />, title: 'Ability Score', width: '400px', height: 'auto' });
                  }}
                >
                  Ability Score
                </button>

                <button
                  type="button"
                  className="menu-item"
                  onClick={() => {
                    showFileMenu();
                    addWindow({ children: <StickyNote />, title: 'New Note', width: '400px', height: '400px' });
                  }}
                >
                  Sticky Note
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
                  children: <FileOpen />,
                  title: 'Open',
                  width: '600px',
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
      <TrashLauncher />
    </>
  );
}
