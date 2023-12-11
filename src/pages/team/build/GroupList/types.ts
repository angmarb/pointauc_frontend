import {ParsedPlayerItem} from '../PlayerList';

export interface ResultPlayerGroup {
    name: string;
    players: ParsedPlayerItem[];
}
export interface ParsedResultPlayerGroup extends ResultPlayerGroup {
    error?: string;
}