import {Button, TextareaAutosize} from '@material-ui/core';
import React, {useCallback, useState} from 'react';
import {PlayerItem} from './PlayerList/types';

interface Props {
    players: PlayerItem[];
}

const ExportPlayersText = ({players}: Props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [text, setText] = useState<string>('');
    const exportToText = useCallback(() => {
        setText(players.map(g => `${g.name}`).join('\n'));
    }, [players]);

    const onClick = useCallback(() => {
        if (players.length) {
            exportToText();
        }
        if (!isOpen) {
            setIsOpen(true);
        }
    }, [isOpen, exportToText, players.length]);

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
            <Button variant={'outlined'} onClick={onClick}>
                Экспортировать игроков в текст
            </Button>
            {isOpen && (<Button variant={'outlined'} onClick={() => setIsOpen(false)}>
                Скрыть
            </Button>)}
        </div>
    );
};

export default ExportPlayersText;