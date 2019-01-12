import * as React from 'react';

import { Incrementality } from '../classes/FeedMessageEnums';
import { FeedHeader } from '../classes/FeedMessage';
import { formatTimestamp, getEnumKeyFromValue } from '../util/FormatUtil';


export interface IFeedHeaderInfoProps {
    feedHeader?: FeedHeader;
}

export default class FeedHeaderInfo extends React.Component<IFeedHeaderInfoProps> {
    constructor(props: IFeedHeaderInfoProps) {
        super(props);
    }

    public render() {
        if (!this.props.feedHeader) { return null; }
        return (
            <div style={{margin: '15px 0'}}>
                <p>GTFS Version: {this.props.feedHeader.gtfsRealtimeVersion || "(not specified)"}</p>
                <p>Incrementality: {getEnumKeyFromValue(this.props.feedHeader.incrementality, Incrementality)}</p>
                <p>Timestamp: {formatTimestamp(this.props.feedHeader.timestamp)}</p>
            </div>
        );
    }
}
