import React from 'react';
import { PlayerContext } from '../Context/Player';
import { WindowsContext } from '../Context/Windows';
import { Spell } from './NewSpell';
import { AbilityScore } from './AbilityScore';
import StickyNote from './StickyNote';

const windowMap = {
  spells: {
    dimensions: {
      width: '350px',
      height: '350px',
    },
    title: item => `Spell: ${item.name}`,
  },
  abilityScores: {
    dimensions: { width: '150px', height: '150px' },
    title: item => `${item.name}`,
  },
  stickyNotes: {
    dimensions: {
      width: '400px',
      height: '400px',
    },
    title: item => item.name,
  },
};

export default function FileOpen() {
  const { player } = React.useContext(PlayerContext);
  const { addWindow } = React.useContext(WindowsContext);

  console.log(player);

  return (
    <section className="p-2">
      {Object.entries(player).map(([heading, items]) => {
        return (
          <div key={heading} className="mb-4 pl-2">
            <h2 className="text-2xl">
              {heading.slice(0, 1).toUpperCase()}
              {heading.slice(1)}
            </h2>
            {items.map(item => (
              <button
                onClick={() => {
                  console.log('heading:', heading, windowMap[heading].dimensions);
                  addWindow({
                    ...windowMap[heading].dimensions,
                    title: windowMap[heading].title(item),
                    children:
                      heading === 'spells' ? (
                        <Spell showAdd={false} item={item} />
                      ) : heading === 'abilityScores' ? (
                        <AbilityScore item={item} />
                      ) : (
                        <StickyNote item={item} />
                      ),
                  });
                }}
                key={`${heading}-${item.name}`}
                className="btn"
              >
                {item.name}
              </button>
            ))}
          </div>
        );
      })}
    </section>
  );
}
