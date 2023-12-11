import React, {Dispatch, SetStateAction, useCallback} from "react";
import {List} from '@material-ui/core';
import {makeBlankPlayer} from '../PlayerList';
import {GroupListItem} from './GroupListItem';
import {ParsedResultPlayerGroup, ResultPlayerGroup} from './types';

interface Props {
    groups: ParsedResultPlayerGroup[];
    setGroups: Dispatch<SetStateAction<ResultPlayerGroup[]>>;
}

export const GroupList = ({setGroups, groups}: Props) => {
    const renameGroup = useCallback((i: number, newName: string) => {
        setGroups(oldGroup => oldGroup.map((g, i1) => i1 === i ? {...g, name: newName} : g));
    }, [setGroups])

    const removeGroup = useCallback((removeIndex: number) => {
        setGroups(oldGroups => oldGroups.filter((_, i) => i !== removeIndex));
    }, [setGroups]);

    const renamePlayer = useCallback((i: number, j: number, newName: string) => {
        setGroups(oldGroups => oldGroups.map((g, i1) => i1 === i ? {
            ...g,
            players: g.players.map((p, j1) => j1 === j ? {
                ...p,
                name: newName
            } : p)
        } : g));
    }, [setGroups]);

    const removePlayer = useCallback((i: number, j: number) => {
        setGroups(oldGroups => oldGroups.map((g, i1) => i1 === i ? {
            ...g,
            players: g.players.filter((p, j1) => j1 !== j),
        } : g));
    }, [setGroups]);

    const addBlankPlayer = useCallback((i: number) => {
        setGroups(oldGroups => oldGroups.map((g, i1) => i1 === i ? {
            ...g,
            players: g.players.concat([makeBlankPlayer()])
        } : g));
    }, [setGroups]);

    return (
        <List className={'groupList'}>
            {groups.map((g,i) => (
                <GroupListItem
                    key={i}
                    index={i}
                    name={g.name}
                    error={g.error}
                    players={g.players}
                    onRename={newName => renameGroup(i, newName)}
                    onRemove={() => removeGroup(i)}
                    addPlayer={() => addBlankPlayer(i)}
                    removePlayer={j => removePlayer(i, j)}
                    renamePlayer={(j, newName) => renamePlayer(i, j, newName)}
                />
            ))}
        </List>
    );
}
