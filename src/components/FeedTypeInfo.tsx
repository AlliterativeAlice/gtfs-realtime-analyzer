import * as React from 'react';

import FeedType from '../enum/FeedType';

export interface IFeedTypeInfoProps {
    feedType: FeedType;
}

export default class FeedTypeInfo extends React.Component<IFeedTypeInfoProps> {
    public render() {
        let message = "";
        switch (this.props.feedType) {
            case FeedType.Alert:
                message = "This is a GTFS Alert feed";
                break;
            case FeedType.TripUpdate:
                message = "This is a GTFS Trip Update feed";
                break;
            case FeedType.VehiclePosition:
                message = "This is a GTFS Vehicle Position feed";
                break;
            case FeedType.Empty:
                message = "This GTFS feed is empty";
                break;
        }
        return (
            <div>
                <h2>{message}</h2>
            </div>
        );
    }
}
