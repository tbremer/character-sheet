import React, { createContext } from 'react';

export const PlayerContext = createContext({});

export function PlayerProvider({ children }) {
  const player = window.localStorage.getItem('player');
  const [playerState, setPlayerState] = React.useState(
    player ? JSON.parse(player) : { stickyNotes: [], spells: [], ac: [], abilityScores: [], trash: [] }
  );

  function updatePlayerState(newState) {
    const nextState = {
      ...playerState,
      ...newState,
    };
    setPlayerState(nextState);
    window.localStorage.setItem('player', JSON.stringify(nextState));
  }

  const api = {
    player: playerState,

    addSpell(spellObj) {
      updatePlayerState({ spells: [...playerState.spells, spellObj] });
    },

    addAbilityScore(item) {
      updatePlayerState({ abilityScores: [...playerState.abilityScores, item] });
    },

    addStickyNote(item) {
      updatePlayerState({ stickyNotes: [...(playerState.stickyNotes || []), item] });
    },

    updateStickyNote(name, value) {
      const noteIdx = playerState.stickyNotes.find(i => i.name === name);

      console.log('value:', value);

      playerState.stickyNotes.splice(noteIdx, 1, {
        name,
        value,
      });

      updatePlayerState({
        stickyNotes: [...playerState.stickyNotes],
      });
    },

    moveToTrash(group, name) {
      const idx = playerState[group].findIndex(i => i.name === name);
      const tmpItem = playerState[group][idx];
      playerState[group].splice(idx, 1);

      updatePlayerState({
        ...playerState,
        trash: [...(playerState.trash || []), tmpItem],
      });
    },

    emptyTrash() {
      updatePlayerState({ trash: [] });
    },

    saveState() {},
  };

  return <PlayerContext.Provider value={api}>{children}</PlayerContext.Provider>;
}
