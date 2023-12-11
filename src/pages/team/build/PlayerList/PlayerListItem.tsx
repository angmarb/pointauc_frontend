import {Input, ListItem} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import React from 'react';

interface Props {
    index?: number;
    onRename(newName: string): void;
    name: string;
    error?: string;
    isLast: boolean;
    onRemove(): void;
    onAdd(): void;
}

export const PlayerListItem = ({index, isLast, onRemove, onRename, error, name, onAdd}: Props) => {
    return (
        <ListItem className={'playerListItem'}>
            {typeof index === 'number' && (<span className={'playerListItemNumber'}>{`${index + 1})`}</span>)}
            <Input
                value={name}
                onChange={e => onRename(e.target.value)}
                className={'playerListItemName'}
                error={!!error}
                onKeyDown={isLast ? (e) => {
                    if (e.key === 'Tab') {
                        onAdd();
                    }
                } : undefined}
            />
            {error && (<span className={'playerListItemError'}>{error}</span>)}
            <Delete onClick={onRemove} className={'clickable playerListItemAction'} titleAccess={'Удалить игрока'}/>
        </ListItem>
    );
};