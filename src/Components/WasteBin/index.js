import React from 'react';
import * as Icons from './Icons';

import { WindowsContext } from '../../Context/Windows';
import { PlayerContext } from '../../Context/Player';

export function TrashLauncher() {
  const { addWindow } = React.useContext(WindowsContext);
  const { player } = React.useContext(PlayerContext);
  const [hover, setHover] = React.useState(false);

  return (
    <button
      className="wastebin-icon"
      type="button"
      onClick={() => {
        addWindow({
          children: <WasteBin />,
          title: 'Waste Bin',
          width: '600px',
        });
      }}
      onDragOver={evt => {
        evt.preventDefault();
        setHover(true);
      }}
      onDragLeave={evt => {
        evt.preventDefault();
        setHover(false);
      }}
      onDrop={evt => {
        evt.persist();
        evt.preventDefault();
        const event = new Event(evt.dataTransfer.getData('text/plain'));
        document.dispatchEvent(event);
        setHover(false);
      }}
      style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        height: '77px',
        width: '60px',
        outline: 'none',
      }}
    >
      {player.trash.length ? (
        hover ? (
          <Icons.TrashFullHover />
        ) : (
          <Icons.TrashFull />
        )
      ) : hover ? (
        <Icons.TrashEmptyHover />
      ) : (
        <Icons.TrashEmpty />
      )}
    </button>
  );
}

function WasteBin() {
  const { player, emptyTrash } = React.useContext(PlayerContext);

  return (
    <>
      <div className="p-2 mb-2 bg-gray-200 flex justify-end " style={{ backgroundColor: '#edf1f3' }}>
        <button type="button" disabled={player.trash.length === 0} className="btn btn-xs" onClick={emptyTrash}>
          Empty
        </button>
      </div>
      <div className="p-2 pt-0">
        {player.trash.map((item, idx) => (
          <button key={`${item.name}-${idx}`} type="button" className={`btn mr-2 last:mr-0 `}>
            {item.name}
          </button>
        ))}
      </div>
    </>
  );
}
