import {Action, ITankConfig, TeamId} from './interfaces';
import {TEAMS} from './constants';

class Tank {
    public id: string
    public name: string | null = null
    public hp: number
    public x: number
    public y: number
    public direction: Action
    public skinUrl: string
    public teamId: TeamId | null = null

    constructor(tankConfig: ITankConfig) {
        this.id = tankConfig.id
        this.name = tankConfig.name
        this.hp = tankConfig.hp
        this.x = tankConfig.x
        this.y = tankConfig.y
        this.skinUrl = tankConfig.skinUrl
        if (tankConfig.teamId === TEAMS.YELLOW || tankConfig.teamId === TEAMS.GREEN) {
            this.teamId = tankConfig.teamId
        }
    }
}

export default Tank
