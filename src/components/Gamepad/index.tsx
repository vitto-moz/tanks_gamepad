import * as React from 'react';
import {IKeyActions, IKeysCodes, ITank} from './interfaces';
import Tank from './tank.model';
import socketService from 'src/services/socketService';

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

class Gamepad extends React.Component<{}, ITank> {

    public state: ITank = new Tank({
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
    }

    public componentDidMount() {
        document.addEventListener('keydown', (event) => {
          if (KEYS_CODES[event.which] === 'SPACE') {
            // this.onFire()
          } else {
            this.move(event.which)
          }
        });
      }
    

    private move(keyCode: number) {
        const action = keysActions[KEYS_CODES[keyCode]]
        const moveDirection = KEYS_CODES[keyCode]
        this.setState(prevState => {
            return {
                x: action.x ? prevState.x + action.x : prevState.x,
                y: action.y ? prevState.y + action.y : prevState.y,
                direction: moveDirection,
            }
        }, () => {
            console.log('this.state ', this.state)
            socketService.move(this.state)
        })
    }

    public render() {
        return (
            null
            // <button
            //     key="registerUserButton"
            //     onClick={this.move}
            //     style={{
            //         position: 'absolute',
            //         top: 10,
            //         left: 10,
            //     }} > start </button>
        )
    }
}

export default Gamepad
