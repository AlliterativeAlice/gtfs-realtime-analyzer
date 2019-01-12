import * as React from 'react';
import { FeedMessage } from '../classes/FeedMessage';

import './CopyFeedJsonButton.css';

export interface ICopyFeedJsonButtonProps {
    feedMessage?: FeedMessage;
}

export interface ICopyFeedJsonButtonState {
    isCopied: boolean;
}

export default class CopyFeedJsonButton extends React.Component<ICopyFeedJsonButtonProps, ICopyFeedJsonButtonState> {
    constructor(props: ICopyFeedJsonButtonProps) {
        super(props);

        this.state = {
            isCopied: false
        }
    }

    input: HTMLInputElement | null = null;
    
    public performCopy = () => {
        if (this.input && !this.state.isCopied) {
            this.input.select();
            document.execCommand('copy');
            this.setState({isCopied: true});
            setTimeout(() => this.setState({isCopied: false}), 4000);
        }
        return false;
    }

    public render() {
        if (!this.props.feedMessage) return null;
        return (
            <React.Fragment>
                <button className="button copy-feed-json-button" onClick={this.performCopy}>Copy Feed JSON to Clipboard</button>
                <input
                    ref={(input) => this.input = input}
                    type="text"
                    defaultValue={ JSON.stringify(this.props.feedMessage, null, "\t") }
                    style={{ position: 'fixed', top: '-1000px' }} />

                {this.state.isCopied && <div className="copy-message"><p>Copied!</p></div>}
            </React.Fragment>
        );
    }
}
