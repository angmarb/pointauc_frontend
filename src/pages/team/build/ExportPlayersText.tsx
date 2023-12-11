import {Button, TextareaAutosize} from '@material-ui/core';
import React, {useCallback, useState} from 'react';
import {ResultPlayerGroup} from './GroupList';

interface Props {
    playerGroups: ResultPlayerGroup[];
}

const ExportPlayersText = ({playerGroups}: Props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [text, setText] = useState<string>('');
    const exportToText = useCallback(() => {
        setText(playerGroups.map(g => `${g.name}\n${g.players.map(p => p.name).join('\n')}`).join('\n\n'));
    }, [playerGroups]);

    const onClick = useCallback(() => {
        if (isOpen) {
            if (playerGroups.length) {
                exportToText();
            } else {
                setIsOpen(false);
            }
        } else {
            if (playerGroups.length) {
                exportToText();
            }
            setIsOpen(true);
        }
    }, [isOpen, exportToText, playerGroups.length]);

    const buttonText = isOpen && !playerGroups.length ? 'Скрыть' : 'Экспортировать группы с игроками в текст';

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
                {buttonText}
            </Button>
        </div>
    );
};

export default ExportPlayersText;