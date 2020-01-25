import React from 'react';
import { WindowsContext } from '../Context/Windows';

function guuid() {
  let d = Date.now();
  return /*const uuid =*/ 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
}

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

    console.log(url);
  }

  return (
    <>
      <div className="sticky top-0 bg-white z-10">
        <form class="flex p-2 pr-4" onSubmit={search}>
          <input
            type="text"
            value={searching}
            onChange={e => setSearching(e.target.value)}
            style={{
              backgroundColor: '#efefef',
            }}
            className="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-pink-500"
          />
          <button class="btn btn-small">Search!</button>
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
                      console.log(i);
                      addWindow({
                        id: guuid(),
                        children: (
                          <section className="">
                            <p className="p-2 text-2xl">{i.name}:</p>
                            <div className="p-2 bg-gray-400">
                              {i.dnd_class} | {i.level} | {i.range}
                            </div>
                            <p className="p-2">{i.desc}</p>
                            {i.higher_level && (
                              <>
                                <p className="p-2 pb-0 text-lg text-gray-600">At higher levels:</p>
                                <p className="p-2">{i.higher_level}</p>
                              </>
                            )}
                          </section>
                        ),
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
