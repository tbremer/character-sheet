import React from 'react';
import { WindowsContext } from '../Context/Windows';
import { PlayerContext } from '../Context/Player';
import guuid from '../lib/guuid';

export default function NewSpell() {
  const [searchResults, setResults] = React.useState(null);
  const [searching, setSearching] = React.useState('');
  const { addWindow } = React.useContext(WindowsContext);

  function search(evt) {
    evt.preventDefault();
    const url = `https://api.open5e.com/spells/?search=${searching}`;

    fetch(url)
      .then(r => r.json())
      .then(setResults)
      .then(console.log, console.error);
  }

  return (
    <>
      <div className="sticky top-0 bg-white z-10">
        <form className="flex p-2 pr-4" onSubmit={search}>
          <input
            type="text"
            value={searching}
            onChange={e => setSearching(e.target.value)}
            style={{
              backgroundColor: '#efefef',
            }}
            className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-pink-500"
          />
          <button className="btn btn-small">Search!</button>
        </form>
        <hr className="my-2 mr-4" />
      </div>

      <section className="p-2 pt-0 pr-4">
        {!searchResults && (
          <p className="text-center">
            <em>Search for spells</em>
          </p>
        )}
        {searchResults && (
          <>
            <h2 className="mb-4 font-semibold">Total: {searchResults.count}.</h2>
            <ul>
              {searchResults.results.map(i => (
                <li key={i.slug}>
                  <button
                    className="btn btn-small btn-block mb-2 last:mb-0"
                    type="button"
                    onClick={() => {
                      addWindow({
                        id: guuid(),
                        children: <Spell item={i} />,
                        title: `Spell: ${i.name}`,
                        width: '350px',
                        height: '350px',
                      });
                      //   loseDialog, children, title, minWidth, height;
                    }}
                  >
                    {i.name}
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </>
  );
}

export function Spell({ item, showAdd }) {
  const { addSpell } = React.useContext(PlayerContext);
  return (
    <section className="">
      <header className="p-2 text-2xl">{item.name}:</header>
      <div className="p-2 bg-gray-400">
        {item.dnd_class} | {item.level} | {item.range}
      </div>
      <p className="p-2">{item.desc}</p>
      {item.higher_level && (
        <>
          <p className="p-2 pb-0 text-lg text-gray-600">At higher levels:</p>
          <p className="p-2">{item.higher_level}</p>
        </>
      )}
      {showAdd && (
        <footer className="p-2">
          <button type="button" onClick={() => addSpell(item)} className="btn btn-small btn-block">
            Add to Spell List
          </button>
        </footer>
      )}
    </section>
  );
}
Spell.defaultProps = { showAdd: true };
