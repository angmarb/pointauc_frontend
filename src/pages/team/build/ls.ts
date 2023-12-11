import {PlayerItem} from './PlayerList/types';
import {Dispatch, SetStateAction, useEffect, useLayoutEffect, useRef} from 'react';
import {ResultPlayerGroup} from './GroupList';
import {LocalStorage} from '../../../constants/common.constants';
import {Grouping} from './GroupingSelect';

export interface Props {
    players: PlayerItem[];
    setPlayers: Dispatch<SetStateAction<PlayerItem[]>>;
    playerGroups: ResultPlayerGroup[];
    setGroups: Dispatch<SetStateAction<ResultPlayerGroup[]>>;
    grouping: Grouping;
    setGrouping: Dispatch<SetStateAction<Grouping>>;
}

type Encoded = {
    players: string[] | null;
    playerGroups: {name: string, players: string[]}[] | null;
    grouping: Grouping | null;
}[];

type Decoded = {
    players: PlayerItem[] | null;
    playerGroups: ResultPlayerGroup[] | null;
    grouping: Grouping | null,
}[];

function encode(currentState: Decoded): Encoded {
    return currentState.map(({players, playerGroups, grouping}) => ({
        players: players?.map(p => p.name) ?? null,
        playerGroups: playerGroups?.map(pg => ({
            name: pg.name,
            players: pg.players.map(p => p.name)
        })) ?? null,
        grouping: grouping
    }));
}

function decode(data: string | undefined | null): Decoded | null {
    if (!data) {
        return null;
    }
    const json = JSON.parse(data);
    if (json && typeof json === 'object' && Array.isArray(json)) {
        return (json as Encoded).map(_j => ({
            players: _j.players?.map(name => ({
                name,
            })) ?? null,
            playerGroups: _j.playerGroups?.map(d => ({
                name: d.name,
                players: d.players.map(name => ({
                    name
                }))
            })) ?? null,
            grouping: _j.grouping ?? null,
        }));
    }
    return null;
}

export function getInitState(): Decoded[0] | null {
    const decoded = decode(localStorage.getItem(LocalStorage.TeamBuildState));
    if (decoded && decoded.length) {
        return decoded[decoded.length - 1];

    }
    return null;
}

export function useTeamBuildLS({
    players, setPlayers, setGroups, playerGroups, setGrouping, grouping
}: Props) {

    const stateList = useRef<Decoded>([]);
    useLayoutEffect(() => {
        const decoded = decode(localStorage.getItem(LocalStorage.TeamBuildState));
        stateList.current = decoded ?? [];
    }, [setGroups, setPlayers, setGrouping]);

    useEffect(() => {
        const last = stateList.current[stateList.current.length - 1];
        if (last && JSON.stringify(players) === JSON.stringify(last.players) && last.grouping === grouping && JSON.stringify(last.playerGroups) === JSON.stringify(playerGroups)) {
            console.log('cached');
            return;
        }
        stateList.current.push({
            players,
            grouping,
            playerGroups
        });
        if (stateList.current.length > 100) {
            stateList.current.shift();
        }
        console.log('Save ', JSON.stringify(stateList.current[stateList.current.length - 1]));
        localStorage.setItem(LocalStorage.TeamBuildState, JSON.stringify(encode(stateList.current)));
    }, [players, playerGroups, grouping]);

    useEffect(() => {
        const listener = (e: KeyboardEvent) => {
            if (e.key === 'z' && e.ctrlKey && stateList.current.length > 1) {
                stateList.current.pop();
                const last = stateList.current[stateList.current.length - 1];
                console.log('Load ' , JSON.stringify(last));
                if (last) {
                    last.players && setPlayers(last.players);
                    last.playerGroups && setGroups(last.playerGroups);
                    last.grouping && setGrouping(last.grouping);
                }
                localStorage.setItem(LocalStorage.TeamBuildState, JSON.stringify(encode(stateList.current)));
            }
        };
        window.addEventListener('keydown', listener);
        return () => {
            window.removeEventListener('keydown', listener);
        };
    }, [setPlayers, setGrouping, setGroups]);
}