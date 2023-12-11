import {Button, TextareaAutosize} from '@material-ui/core';
import React, {Dispatch, SetStateAction, useCallback, useState} from 'react';
import {PlayerItem} from './PlayerList/types';

interface Props {
    setPlayers: Dispatch<SetStateAction<PlayerItem[]>>;
}

const PastePlayers = ({setPlayers}: Props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [text, setText] = useState<string>('');
    const paste = useCallback(() => {
        const names = text.split('\n').map(r => r.trim()).filter(x => !!x);
        setPlayers(oldPlayers => oldPlayers.concat(names.map(name => ({
            name
        }))));
    }, [setPlayers, text]);

    return (
        <div className={'pastePlayers'}>
            {isOpen && (
                <TextareaAutosize
                    className={'pastePlayersTextarea'}
                    value={text}
                    onChange={e => setText(e.target.value)}
                    rowsMin={5}
                />
            )}
            <Button variant={'outlined'} onClick={!isOpen ? (
                () => setIsOpen(true)
            ) : (
                text ? paste : (() => setIsOpen(false))
            )}>
                {isOpen && !text ? 'Скрыть' : 'Вставить игроков из текста'}
            </Button>
        </div>
    );
};

export default PastePlayers;