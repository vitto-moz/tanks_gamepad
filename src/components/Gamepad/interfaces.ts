import { ITank } from './../../services/socketService/interfaces';
export type direction = 'LEFT' | 'RIGHT' | 'UP' | 'DOWN' | 'SPACE'

export interface IKeysCodes {
    [index: string]: direction;
}

export interface IKeyAction {
    [index: string]: number;
}

export interface IKeyActions {
    [index: string]: IKeyAction;
}

export interface IBullet {
    onFly: boolean;
    direction: direction;
}

export interface ITank {
    hp: number
    x: number
    y: number
    direction: direction
}

export interface ITankConfig extends ITank {
    id: string
    name: string
}