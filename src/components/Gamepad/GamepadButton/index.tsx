import * as React from 'react';
import './gamepadButton.css'
import {Direction} from '../interfaces';

interface Props {
    buttonName: Direction
    onClick: (buttonName: Direction) => void
    customBtn: string
    // icon: string
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
        this.props.onClick(this.props.buttonName);
        this.pressInterval = setInterval(() => {
            this.props.onClick(this.props.buttonName)
        }, 1000)
    }

    private onLongPressEnd() {
        clearInterval(this.pressInterval)
    }

    public render() {
        const { children, customBtn } = this.props;
        return (
            <div
                onTouchStart={this.onLongPress}
                onTouchEnd={this.onLongPressEnd}
                onClick={this.onClick}
                className = { customBtn }>
                {/*{this.props.buttonName}*/}
                {/*<img className = "gamepadIcon" src = { this.props.icon } />*/}
                {children}
            </div>
        )
    }
}

export default GamepadButton
