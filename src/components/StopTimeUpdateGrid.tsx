import * as React from 'react';
import ReactTable from "react-table";


import { EntitySelector, StopTimeUpdate } from '../classes/FeedMessage';
import { StopTimeScheduleRelationship } from '../classes/FeedMessageEnums';
import { formatTimestamp, getEnumKeyFromValue } from '../util/FormatUtil';

import 'react-table/react-table.css';
import './StopTimeUpdateGrid.css';

export interface IStopTimeUpdateGridProps {
    stopTimeUpdates: StopTimeUpdate[] | null;
}

export default class StopTimeUpdateGrid extends React.Component<IStopTimeUpdateGridProps> {

    public getInformedEntityStr(informedEntity: EntitySelector): string {
        if (!informedEntity) { return 'N/A'; }
        else if (informedEntity.routeId) { return `Route ${informedEntity.routeType} ${informedEntity.routeId}`; }
        else if (informedEntity.agencyId) { return `Agency ${informedEntity.agencyId}`; }
        else if (informedEntity.stopId) { return `Stop ${informedEntity.stopId}`; }
        else if (informedEntity.trip) { return `Trip ${informedEntity.trip.tripId}`; }
        return 'N/A';
    }

    public render() {
        if (!this.props.stopTimeUpdates) { return null; }
        return (
            <ReactTable minRows={1} className="stop-time-updates" data={this.props.stopTimeUpdates} columns={[
                { id: 'stopId', Header: 'Stop ID', accessor: s => s.stopId || 'N/A' },
                { id: 'seq', Header: 'Sequence', accessor: s => s.stopSequence || 'N/A' },
                { id: 'arrivalDelay', Header: 'Arrival Delay', accessor: s => !s.arrival || (!s.arrival.delay && s.arrival.delay !== 0) ? 'N/A' : s.arrival.delay },
                { id: 'arrivalTime', Header: 'Arrival Time', accessor: s => s.arrival ? s.arrival.time : undefined, Cell: props => formatTimestamp(props.value) },
                { id: 'arrivalUncertainty', Header: 'Arrival Uncertainty', accessor: s => !s.arrival || (!s.arrival.uncertainty && s.arrival.uncertainty !== 0) ? 'N/A' : s.arrival.uncertainty },
                { id: 'departureDelay', Header: 'Departure Delay', accessor: s => !s.departure || (!s.departure.delay && s.departure.delay !== 0) ? 'N/A' : s.departure.delay },
                { id: 'departureTime', Header: 'Departure Time', accessor: s => s.departure ? s.departure.time : undefined, Cell: props => formatTimestamp(props.value) },
                { id: 'departureUncertainty', Header: 'Departure Uncertainty', accessor: s => !s.departure || (!s.departure.uncertainty && s.departure.uncertainty !== 0) ? 'N/A' : s.departure.uncertainty },
                { id: 'scheduleRelationship', Header: 'Schedule Relationship', accessor: s => getEnumKeyFromValue(s.scheduleRelationship, StopTimeScheduleRelationship) }
            ]} />
        );
    }
}
