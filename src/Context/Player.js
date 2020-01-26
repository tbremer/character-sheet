import React, { createContext } from 'react';

export const PlayerContext = createContext({});

export function PlayerProvider({ children }) {
  const player = window.localStorage.getItem('player');
  const [playerState, setPlayerState] = React.useState(
    player ? JSON.parse(player) : { spells: [], ac: [], abilityScores: [] }
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

    saveState() {},
  };

  return <PlayerContext.Provider value={api}>{children}</PlayerContext.Provider>;
}
