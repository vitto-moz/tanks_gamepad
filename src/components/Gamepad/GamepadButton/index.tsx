import * as React from 'react';
import './gamepadButton.css'
import {Direction} from '../interfaces';

interface Props {
    buttonName: Direction
    onClick: (buttonName: Direction) => void
    icon: string
}

class GamepadButton extends React.Component<Props, {}> {

    private pressInterval: NodeJS.Timeout;

    constructor(props: Props) {
        super(props)
        this.onClick = this.onClick.bind(this)
        this.onLongPress = this.onLongPress.bind(this)
        this.onLongPressEnd = this.onLongPressEnd.bind(this)
    }

    private onClick() {
        this.props.onClick(this.props.buttonName)
    }

    private onLongPress() {
        this.props.onClick(this.props.buttonName)
        this.pressInterval = setInterval(() => {
            this.props.onClick(this.props.buttonName)
        }, 1000)
    }

    private onLongPressEnd() {
        clearInterval(this.pressInterval)
    }

    public render() {
        return (
            <button
                onTouchStart={this.onLongPress}
                onTouchEnd={this.onLongPressEnd}
                onClick={this.onClick}
                className="gamepadButton">
                {/*{this.props.buttonName}*/}
                <img className = "gamepadIcon" src = { this.props.icon } />
            </button>
        )
    }
}

export default GamepadButton
