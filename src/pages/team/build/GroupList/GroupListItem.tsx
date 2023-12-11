import {Input, List, ListItem} from '@material-ui/core';
import {Add, Delete} from '@material-ui/icons';
import React from 'react';
import {ParsedPlayerItem, PlayerListItem} from '../PlayerList';

interface Props {
    name: string;
    players: ParsedPlayerItem[];
    index: number;
    error?: string;
    onRemove(): void;
    onRename(newName: string): void;
    addPlayer(): void;
    removePlayer(j: number): void;
    renamePlayer(j: number, newName: string): void;
}

export const GroupListItem = ({name, players, index, error, onRemove, onRename, addPlayer, removePlayer, renamePlayer}: Props) => {
    return (
        <ListItem className={'groupListItem'}>
            <div className={'groupListItemContent'}>
                <div className={'groupListItemHead'}>
                    <span className={'groupListItemNumber'}>{`${index + 1})`}</span>
                    <Input
                        value={name}
                        onChange={e => onRename(e.target.value)}
                        className={'groupListItemName'}
                        error={!!error}
                    />
                    {error && (<span className={'groupListItemError'}>{error}</span>)}
                    <Delete onClick={onRemove} className={'clickable groupListItemAction'} titleAccess={'Удалить группу'}/>
                    <Add onClick={addPlayer} className={'clickable groupListItemAction'} titleAccess={'Добавить игрока в группу'} />
                </div>
                <div>
                    <List className={'playerList'} disablePadding>
                        {players.map((p,j) => (
                            <PlayerListItem
                                key={j}
                                error={p.error}
                                name={p.name}
                                onAdd={addPlayer}
                                onRemove={() => removePlayer(j)}
                                onRename={newName => renamePlayer(j, newName)}
                                isLast={j === players.length - 1}
                            />
                        ))}
                    </List>
                </div>
            </div>
        </ListItem>
    );
};
