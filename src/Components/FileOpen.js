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
    children: item => <Spell showAdd={false} item={item} />,
    title: item => `Spell: ${item.name}`,
  },
  abilityScores: {
    dimensions: { width: '150px', height: '150px' },
    title: item => `${item.name}`,
    children: item => <AbilityScore item={item} />,
  },
  stickyNotes: {
    dimensions: {
      width: '400px',
      height: '400px',
    },
    title: item => item.name,
    children: item => <StickyNote item={item} />,
  },
};

function File({ item, heading, windowRef }) {
  const [isDragging, setDragging] = React.useState(false);
  const { addWindow } = React.useContext(WindowsContext);
  const { moveToTrash } = React.useContext(PlayerContext);
  const evtName = `moveToTrash-${heading}${item.name}`;

  React.useEffect(() => {
    function handle(evt) {
      evt.preventDefault();
    }

    function remove() {
      console.log('remove');
      moveToTrash(heading, item.name);
    }

    document.addEventListener('dragover', handle);
    document.addEventListener(evtName, remove);

    return () => {
      document.removeEventListener('dragover', handle);
      document.removeEventListener(evtName, remove);
    };
  });

  return (
    <button
      draggable
      onDrop={evt => console.log('drop', evt)}
      onDragOver={evt => {
        evt.preventDefault();
      }}
      onDragStart={evt => {
        setDragging(true);
        evt.dataTransfer.setData('text/plain', evtName);
      }}
      onDragEnd={() => setDragging(false)}
      onClick={() => {
        addWindow({
          ...windowMap[heading].dimensions,
          title: windowMap[heading].title(item),
          children: windowMap[heading].children(item),
        });
      }}
      key={`${heading}-${item.name}`}
      className={`btn mr-2 last:mr-0 ${isDragging ? 'opacity-50' : ''}`}
    >
      {item.name}
    </button>
  );
}

export default function FileOpen() {
  const { player } = React.useContext(PlayerContext);

  return (
    <section className="p-2">
      {Object.entries(player).map(([heading, items]) => {
        if (heading === 'trash') return null;
        return (
          <div key={heading} className="mb-4 pl-2">
            <h2 className="text-2xl">
              {heading.slice(0, 1).toUpperCase()}
              {heading.slice(1)}
            </h2>
            {items.map(i => (
              <File key={i.name} item={i} heading={heading} />
            ))}
          </div>
        );
      })}
    </section>
  );
}
