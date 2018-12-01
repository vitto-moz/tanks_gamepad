import * as React from 'react';
import './gamepadButton.css'
import {Action} from '../interfaces';

interface Props {
    buttonName: Action
    onClick: (buttonName: Action) => void
    icon: string
    customBtn: string
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
        if (this.props.buttonName) {
            this.props.onClick(this.props.buttonName)
        }
    }

    private onLongPress() {
        if (this.props.buttonName) {
            this.props.onClick(this.props.buttonName)
            this.pressInterval = setInterval(() => {
                if (this.props.buttonName) {
                    this.props.onClick(this.props.buttonName)
                }
            }, 250)
        }
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
