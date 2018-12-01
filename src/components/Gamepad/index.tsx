import * as React from 'react';
import {IKeyActions, IKeysCodes, Action, ITeams} from './interfaces';
import Tank from './tank.model';
// import GamepadButton from './GamepadButton';
import socketService from 'src/services/socketService';
import './gamepad.css';
import GamepadButton from './GamepadButton';

const KEYS_CODES: IKeysCodes = {
    37: 'LEFT',
    39: 'RIGHT',
    38: 'UP',
    40: 'DOWN',
    32: 'SPACE'
};

const QUANTUM = 100
const TEAMS: ITeams = {
    YELLOW: 'YELLOW',
    GREEN: 'GREEN'
}

const keysActions: IKeyActions = {
    DOWN: {y: +QUANTUM},
    LEFT: {x: -QUANTUM},
    RIGHT: {x: +QUANTUM},
    UP: {y: -QUANTUM},
};

class Gamepad extends React.Component<{}, Tank> {

    public state: Tank = new Tank({
        id: '111',
        name: 'test_tank',
        hp: 100,
        x: 0,
        y: 0,
        direction: 'DOWN'
    });



    constructor(props: {}) {
        super(props)
        this.move = this.move.bind(this)
        this.fire = this.fire.bind(this)
        socketService.registerUser('test user', TEAMS.YELLOW, (id: string) => {
            this.setState({id}, () => {
                this.listenKeyboardEvents()
            })
        })
    }

    private listenKeyboardEvents() {
        document.addEventListener('keydown', (event) => {
            if (KEYS_CODES[event.which] === 'SPACE') {
                this.fire()
            } else {
                this.move(event.which)
            }
        });
    }

    private move(keyCode: number | Action) {
        const action = typeof keyCode === 'string'
            ? keysActions[keyCode]
            : keysActions[KEYS_CODES[keyCode]]

        // tslint:disable-next-line:no-debugger
        // debugger
        const moveDirection: Action = typeof keyCode === 'string'
            ? keyCode : KEYS_CODES[keyCode]

        if (action) {
            this.setState(prevState => {
                return {
                    x: action.x ? prevState.x + action.x : prevState.x,
                    y: action.y ? prevState.y + action.y : prevState.y,
                    direction: moveDirection,
                }
            }, () => {
                socketService.move(this.state.id, this.state.direction)
            })
        }

    }

    private fire() {
        socketService.fire(this.state.id)
    }

    public render() {
        return (
            <div className="gamepadWrap">
                        <div className="dpad-container">
                            <div className="dpad-backdrop"/>
                            <GamepadButton
                                customBtn = {'dpad dpad-up'}
                                buttonName = {'UP'}
                                           onClick = { this.move} >
                                <div className="arrow-up"/>
                                <div className="arrow-up2"/>
                            </GamepadButton>
                            <GamepadButton  customBtn = {'dpad dpad-right'}
                                            buttonName = {'RIGHT'}
                                            onClick = { this.move }>
                                <div className="arrow-right2"/>
                                <div className="arrow-right"/>
                            </GamepadButton>
                            <GamepadButton customBtn = {'dpad dpad-down'}
                            buttonName={'DOWN'}
                            onClick={this.move}>
                                <div className="arrow-down2"/>
                                <div className="arrow-down"/>
                            </GamepadButton>
                            <GamepadButton customBtn={'dpad dpad-left'}
                                           buttonName={'LEFT'}
                                           onClick={this.move}
                            >
                                <div className="arrow-left"/>
                                <div className="arrow-left2" />
                            </GamepadButton>
                            <div className="dpad dpad-center" />
                </div>
                <div className="btns-container">
                    <GamepadButton buttonName={'FIRE'} icon = { right } onClick={this.fire} />
                </div>
            </div>
        )
    }
}

export default Gamepad;
