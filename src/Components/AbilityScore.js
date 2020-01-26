import React from 'react';
import { WindowsContext } from '../Context/Windows';
import { PlayerContext } from '../Context/Player';

export default function NewAbilityScore() {
  const [name, setName] = React.useState('');
  const [score, setScore] = React.useState('');
  const [modifier, setModifier] = React.useState('');
  const { addWindow } = React.useContext(WindowsContext);
  const { addAbilityScore } = React.useContext(PlayerContext);

  function addScore(evt) {
    evt.preventDefault();
    // const url = `https://api.open5e.com/spells/?search=${searching}`;

    console.log(evt.target.elements);

    const item = {
      name,
      score,
      modifier,
    };

    addAbilityScore(item);
    addWindow({ width: '100px', height: '100px', child: <AbilityScore key={item.name} item={item} /> });

    setName('');
    setScore('');
    setModifier('');

    // fetch(url)
    //   .then(r => r.json())
    //   .then(setResults)
    //   .then(console.log, console.error);
  }

  return (
    <>
      <div className="sticky top-0 bg-white z-10">
        <form className="flex flex-col p-2 pr-4" onSubmit={addScore}>
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Ability Name:"
            onChange={e => setName(e.target.value)}
            style={{
              backgroundColor: '#efefef',
            }}
            className="mb-2 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-pink-500"
          />
          <input
            type="number"
            value={score}
            name="score"
            placeholder="Ability Score:"
            onChange={e => setScore(e.target.value)}
            style={{
              backgroundColor: '#efefef',
            }}
            className="mb-2 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-pink-500"
          />
          <input
            type="number"
            value={modifier}
            name="modifier"
            placeholder="Ability Modifier:"
            onChange={e => setModifier(e.target.value)}
            style={{
              backgroundColor: '#efefef',
            }}
            className="mb-2 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-pink-500"
          />
          <button className="btn btn-small">Add Ability Score!</button>
        </form>
      </div>
    </>
  );
}

export function AbilityScore({ item }) {
  const { addSpell } = React.useContext(PlayerContext);
  return (
    <section className="p-2">
      <header className="text-2xl">{item.name}:</header>
      <div className="text-xl">Score: {item.score}</div>
      <p className="text-xl">Modifier: {item.modifier}</p>
    </section>
  );
}
