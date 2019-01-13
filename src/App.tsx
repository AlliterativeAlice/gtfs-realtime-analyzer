import './App.css';

import * as React from 'react';
import ReactDropzone from "react-dropzone";

import { FeedMessage } from './classes/FeedMessage';
import FeedInformation from './components/FeedInformation';

import { getFeedMessageFromBinaryString } from './util/ParseFeedUtil';
import CopyFeedJsonButton from './components/CopyFeedJsonButton';

import { ReactTableDefaults } from 'react-table'

// Create a default cell renderer so that all grid cells will have the full cell contents appear on hover
ReactTableDefaults.column.Cell = props => typeof props.value === 'string' ? <span title={props.value}>{props.value}</span> : props.value;

export interface IAppProps {
    isEditMode?: boolean;
}

export interface IAppState {
    feedMessage?: FeedMessage;
    feedError?: string;
}

class App extends React.Component<IAppProps, IAppState> {

    public dropzone: ReactDropzone | null = null;

    constructor(props: IAppProps) {
        super(props);

        this.state = {}
    }

    public loadFile(file: File) {
        this.setState({feedError: undefined, feedMessage: undefined});
            const fr = new FileReader();
            fr.onload = (e) => {
                try {
                    const message = getFeedMessageFromBinaryString(fr.result as ArrayBuffer);
                    
                    this.setState({feedMessage: message});
                }
                catch(e) {
                    if (e.name && e.name === 'ProtocolError') {
                        this.setState({feedError: e.message});
                    }
                    else {
                        this.setState({feedError: 'Invalid GTFS feed'});
                    }
                }
            }
            fr.readAsArrayBuffer(file);
    }

    public fileSelected = (ev: React.ChangeEvent<HTMLInputElement>) => {
        if (ev.target.files && ev.target.files.length > 0) {
            this.loadFile(ev.target.files[0]);
        }
    }

    public triggerFileInput = () => {
        if (this.dropzone) { this.dropzone.open(); }
    }

    public onDrop = (files: File[]) => {
        if (files.length > 0) {
            this.loadFile(files[0]);
        }
    }

    public assignDropzone = (dropzone: ReactDropzone) => {
        this.dropzone = dropzone;
    }

    public render() {
        return (
            <ReactDropzone ref={this.assignDropzone} onDrop={this.onDrop} disableClick={true}>
                {({getRootProps, getInputProps, isDragActive}) => {
                    return (
                        <div {...getRootProps({tabIndex: undefined})} className="app">
                            {isDragActive && <div className="drag-overlay"><h2>Drop File to Analyze</h2></div>}
                            <h1>GTFS Realtime Feed Analyzer</h1>
                            <p>To get started, click the button below and select a GTFS realtime feed file to analyze, or just drag and drop it onto the page!</p>
                            <input className="gtfs-feed-file-input" {...getInputProps()} />
                            <button className="button gtfs-upload-button" onClick={this.triggerFileInput}>{this.state.feedMessage ? "Load Another Feed" : "Load GTFS Realtime Feed"}</button>
                            <CopyFeedJsonButton feedMessage={this.state.feedMessage} />
                            <FeedInformation feedMessage={this.state.feedMessage} />
                            {this.state.feedError && <p style={{color: 'red'}}>Parsing GTFS feed failed with the following error: {this.state.feedError}</p>}
                        </div>
                    )
                }}
            </ReactDropzone>
        );
    }
}

export default App;
