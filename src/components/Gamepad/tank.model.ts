import {Action, ITankConfig} from './interfaces';

class Tank {
    public id: string
    public name: string
    public hp: number
    public x: number
    public y: number
    public direction: Action

    constructor(tankConfig: ITankConfig) {
        this.id = tankConfig.id
        this.name = tankConfig.name
        this.hp = tankConfig.hp
        this.x = tankConfig.x
        this.y = tankConfig.y
    }
}

export default Tank
