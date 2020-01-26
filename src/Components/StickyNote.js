import React from 'react';
import { PlayerContext } from '../Context/Player';

export default function StickyNote({ item }) {
  console.log('StickyNote:', item);
  const [text, updateText] = React.useState(item.value);
  const { addStickyNote, updateStickyNote } = React.useContext(PlayerContext);

  function saveNote() {
    if (item.name) {
      updateStickyNote(item.name, text);
      return;
    }

    name = window.prompt('File Name:');

    addStickyNote({ name, value: text });
  }
  return (
    <div className="flex flex-col h-full">
      <textarea
        className="p-2 flex-1 border-gray-900 border-b-1"
        style={{ width: '100%', height: '100%', resize: 'none' }}
        value={text}
        onChange={e => updateText(e.target.value)}
      />
      <button className="btn btn-block" onClick={saveNote}>
        Save Note
      </button>
    </div>
  );
}
StickyNote.defaultProps = { item: { value: '' } };
