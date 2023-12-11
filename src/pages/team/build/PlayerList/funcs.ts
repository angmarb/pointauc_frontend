import {Dispatch, SetStateAction, useCallback, useMemo, useState} from 'react';
import {PlayerItem} from './types';
import {getInitState} from '../ls';

export function makeBlankPlayer(): PlayerItem {
    return {
        name: ''
    };
}

export function getError(player: PlayerItem, players: PlayerItem[]): string | undefined {
    if (player.name && players.find(p => p.name === player.name) !== player) {
        return 'Не уникальное имя';
    }
    return undefined;
}

export function useAddBlankPlayer(setPlayers: Dispatch<SetStateAction<PlayerItem[]>>) {
    return useCallback(() => {
        setPlayers(oldPlayers => oldPlayers.concat([makeBlankPlayer()]));
      }, [setPlayers]);
}

function init() {
    return getInitState()?.players ?? [];
}

export function usePlayerItems() {
  const [_players, setPlayers] = useState<PlayerItem[]>(init);

  const players = useMemo(() => (
      _players.map(p => ({
          name: p.name,
          error: getError(p, _players)
      }))
  ), [_players]);
  return {
      _players,
      players,
      setPlayers
  };
}