import {Dispatch, SetStateAction, useCallback, useMemo, useState} from 'react';
import {ParsedResultPlayerGroup, ResultPlayerGroup} from './types';

export function makeEmptyGroups(playerCount: number, groupSize: number): ResultPlayerGroup[] {
    const groupCount = Math.ceil(playerCount / groupSize);
    const result: ResultPlayerGroup[] = [];
    for (let i = 0; i < groupCount; ++i) {
        result[i] = {
            name: `Группа ${i+1}`,
            players: []
        };
    }
    return result;
}

export function useAddBlankPlayerGroup(setGroups: Dispatch<SetStateAction<ResultPlayerGroup[]>>) {
  return useCallback(() => {
    setGroups(oldPlayers => oldPlayers.concat([makeBlankPlayerGroup()]));
  }, [setGroups]);
}

export function usePlayerGroupItems() {
  const [_groups, setGroups] = useState<ResultPlayerGroup[]>([]);

  const playerGroups: ParsedResultPlayerGroup[] = useMemo(() => (
      _groups.map(p => ({
          name: p.name,
          error: getError(p, _groups),
          players: p.players,
      }))
  ), [_groups]);
  return {
      _groups,
      setGroups,
      playerGroups,
  };
}


export function makeBlankPlayerGroup(): ResultPlayerGroup {
    return {
        name: '',
        players: [],
    };
}

export function getError(playerGroup: ResultPlayerGroup, players: ResultPlayerGroup[]): string | undefined {
    if (playerGroup.name && players.find(p => p.name === playerGroup.name) !== playerGroup) {
        return 'Не уникальное имя';
    }
    return undefined;
}
