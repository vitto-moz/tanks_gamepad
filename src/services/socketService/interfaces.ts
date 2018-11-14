import {Direction} from 'src/components/Gamepad/interfaces';

export interface ITank {
    id: string
    name: string
    hp: number
    x: number
    y: number
    direction: Direction
}

export interface ITanks {
    [index: string]: ITank
}
