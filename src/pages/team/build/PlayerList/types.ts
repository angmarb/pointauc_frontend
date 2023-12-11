export interface PlayerItem {
    name: string;
}
export interface ParsedPlayerItem extends PlayerItem {
    error?: string;
}
