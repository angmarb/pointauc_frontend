import React, {Dispatch, SetStateAction, useCallback} from "react";
import {List} from '@material-ui/core';
import {ParsedPlayerItem, PlayerItem} from './types';
import {useAddBlankPlayer} from './funcs';
import {PlayerListItem} from './PlayerListItem';

interface Props {
    players: ParsedPlayerItem[];
    setPlayers: Dispatch<SetStateAction<PlayerItem[]>>;
}

export const PlayerList = ({setPlayers, players}: Props) => {
    const renamePlayer = useCallback((i: number, newName: string) => {
        setPlayers(oldPlayers => oldPlayers.map((p, j) => j === i ? {...p, name: newName} : p));
    }, [setPlayers])

    const removePlayer = useCallback((removeIndex: number) => {
        setPlayers(oldPlayers => oldPlayers.filter((_, i) => i !== removeIndex));
    }, [setPlayers]);
    const addBlankPlayer = useAddBlankPlayer(setPlayers);

    return (
        <List className={'playerList'}>
            {players.map((p, i) => (
                <PlayerListItem
                    key={i}
                    index={i}
                    error={p.error}
                    name={p.name}
                    onAdd={addBlankPlayer}
                    onRemove={() => removePlayer(i)}
                    onRename={newName => renamePlayer(i, newName)}
                    isLast={i === players.length - 1}
                />
            ))}
        </List>
    );
}
