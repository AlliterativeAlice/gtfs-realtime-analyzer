import * as React from 'react';
import ReactModal from 'react-modal';

import './ModalWindow.css';

ReactModal.setAppElement('#root');

export interface IModalWindowProps {
    isOpen: boolean;
    onClosed?: Function;
}

export interface IModalWindowState {
    isOpen: boolean;
}

export default class ModalWindow extends React.Component<IModalWindowProps, IModalWindowState> {
    constructor(props: IModalWindowProps) {
        super(props);

        this.state = {
            isOpen: props.isOpen
        }
    }

    public componentDidUpdate(prevProps: IModalWindowProps) {
        if (prevProps.isOpen !== this.props.isOpen) {
            this.setState({isOpen: this.props.isOpen});
        }
    }

    public close = () => {
        this.setState({isOpen: false});
        if (this.props.onClosed) this.props.onClosed();
    }

    public render() {
        return (
            <ReactModal isOpen={this.state.isOpen} onRequestClose={this.close}>
                <button className="close-modal" onClick={this.close}>&times;</button>
                {this.props.children}
            </ReactModal>
        );
    }
}
