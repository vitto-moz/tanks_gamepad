import * as React from 'react';
import {IKeyActions, IKeysCodes, Direction} from './interfaces';
import Tank from './tank.model';
import GamepadButton from './GamepadButton';
import socketService from 'src/services/socketService';
import './gamepad.css';

const KEYS_CODES: IKeysCodes = {
    37: 'LEFT',
    39: 'RIGHT',
    38: 'UP',
    40: 'DOWN',
    32: 'SPACE'
}

const QUANTUM = 100

const keysActions: IKeyActions = {
    DOWN: {y: +QUANTUM},
    LEFT: {x: -QUANTUM},
    RIGHT: {x: +QUANTUM},
    UP: {y: -QUANTUM},
}

class Gamepad extends React.Component<{}, Tank> {

    public state: Tank = new Tank({
        id: '111',
        name: 'test_tank',
        hp: 100,
        x: 0,
        y: 0,
        direction: 'DOWN'
    })


    constructor(props: {}) {
        super(props)
        this.move = this.move.bind(this)
        socketService.registerUser('test user', (id: string) => {
            this.setState({id}, () => {
                this.listenKeyboardEvents()
            })
        })
    }

    private listenKeyboardEvents() {
        document.addEventListener('keydown', (event) => {
            if (KEYS_CODES[event.which] === 'SPACE') {
                // this.onFire()
            } else {
                this.move(event.which)
            }
        });
    }

    private move(keyCode: number | Direction) {
        const action = typeof keyCode === 'string'
            ? keysActions[keyCode]
            : keysActions[KEYS_CODES[keyCode]]

        // tslint:disable-next-line:no-debugger
        // debugger
        const moveDirection: Direction = typeof keyCode === 'string'
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

    public render() {
        return (
            <div className="gamepadWrap">
                <GamepadButton buttonName={'UP'} onClick={this.move} />
                <div className="gamepadMiddleLineWrap">
                    <GamepadButton buttonName={'LEFT'} onClick={this.move} />
                    <GamepadButton buttonName={'RIGHT'} onClick={this.move} />
                </div>
                <GamepadButton buttonName={'DOWN'} onClick={this.move} />
            </div>

        )
    }
}

export default Gamepad
