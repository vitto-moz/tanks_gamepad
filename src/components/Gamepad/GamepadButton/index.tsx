import * as React from 'react';
import './gamepadButton.css'
import {Direction} from '../interfaces';

interface Props {
    buttonName: Direction
    onClick: (buttonName: Direction) => void
}

class GamepadButton extends React.Component<Props, {}> {

    constructor(props: Props) {
        super(props)
        this.onClick = this.onClick.bind(this)
    }

    private onClick() {
        this.props.onClick(this.props.buttonName)
    }

    public render() {
        return (
            <button
                onClick={this.onClick}
                className="gamepadButton">
                {this.props.buttonName}
            </button>
        )
    }
}

export default GamepadButton
