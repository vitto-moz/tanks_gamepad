import { ITank } from './../../services/socketService/interfaces';
export type Direction = 'LEFT' | 'RIGHT' | 'UP' | 'DOWN' | 'SPACE'
export type Action = Direction | 'FIRE'


export interface IKeysCodes {
    [index: string]: Direction;
}

export interface IKeyAction {
    [index: string]: number;
}

export interface IKeyActions {
    [index: string]: IKeyAction;
}

export interface IBullet {
    onFly: boolean;
    direction: Direction;
}

export interface ITank {
    hp: number
    x: number
    y: number
    direction: Direction
}

export interface ITankConfig extends ITank {
    id: string
    name: string
}

export type TeamId = 'YELLOW' | 'GREEN'

export interface ITeams {
    [index: string]: TeamId
}

