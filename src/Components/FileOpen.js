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
  const itemRef = React.useRef(null);
  const { addWindow } = React.useContext(WindowsContext);

  let curZ = 0;

  React.useEffect(() => {
    const { current: itemElem } = itemRef;
    // const { current: windowElem } = windowRef;
    const offset = { x: 0, y: 0 };
    let node = null;
    let prevY;

    function mDown(evt) {
      node = itemElem.cloneNode(true);
      const bounds = itemElem.getBoundingClientRect();

      node.style.position = 'fixed';
      node.style.opacity = 0.5;

      offset.x = bounds.x - evt.clientX;
      offset.y = bounds.y - evt.clientY;

      node.style.top = bounds.top + 'px';
      node.style.left = bounds.left + 'px';
      node.style.zIndex = curZ;

      document.addEventListener('mousemove', mMove);
      document.addEventListener('mouseup', mUp);
    }

    function mMove(evt) {
      evt.preventDefault();
      if (node !== null) document.body.appendChild(node);
      const bounds = node.getBoundingClientRect();

      node.style.left = `${evt.clientX + offset.x}px`;
      if (bounds.top > 44 || (prevY && evt.clientY > prevY)) {
        node.style.top = `${evt.clientY + offset.y}px`;
      }
      if (bounds.top <= 44 && !prevY) prevY = evt.clientY;
      if (bounds.top > 44 && prevY) prevY = undefined;
    }

    function mUp() {
      document.removeEventListener('mousemove', mMove);
      document.removeEventListener('mouseup', mUp);
      node = null;
      prevY = undefined;
    }

    itemElem.addEventListener('mousedown', mDown);

    return mUp;
  }, [itemRef.current]);

  return (
    <button
      ref={itemRef}
      onClick={() => {
        addWindow({
          ...windowMap[heading].dimensions,
          title: windowMap[heading].title(item),
          children: windowMap[heading].children(item),
        });
      }}
      key={`${heading}-${item.name}`}
      className="btn mr-2 last:mr-0"
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
