import * as React from 'react';
import ReactTable from "react-table";


import { EntitySelector } from '../classes/FeedMessage';
import { TripScheduleRelationship } from '../classes/FeedMessageEnums';
import { getEnumKeyFromValue, formatNumber } from '../util/FormatUtil';

import 'react-table/react-table.css';
import './InformedEntityGrid.css';

export interface IInformedEntityGridProps {
    informedEntities: EntitySelector[] | null;
}

export default class InformedEntityGrid extends React.Component<IInformedEntityGridProps> {

    public render() {
        if (!this.props.informedEntities) { return null; }
        return (
            <ReactTable minRows={1} className="informed-entities" data={this.props.informedEntities} columns={[
                { id: 'agencyId', Header: 'Agency ID', accessor: s => s.agencyId || 'N/A' },
                { id: 'routeType', Header: 'Route Type', accessor: s => s.routeType || 'N/A' },
                { id: 'routeId', Header: 'Route ID', accessor: s => s.routeId || 'N/A' },
                { id: 'stopId', Header: 'Stop ID', accessor: s => s.stopId || 'N/A' },
                { id: 'tripId', Header: 'Trip ID', accessor: s => s.trip ? s.trip.tripId || 'N/A' : 'N/A' },
                { id: 'tripDirectionId', Header: 'Trip Direction ID', accessor: s => s.trip ? formatNumber(s.trip.directionId) : 'N/A' },
                { id: 'tripRouteId', Header: 'Trip Route ID', accessor: s => s.trip ? s.trip.routeId || 'N/A' : 'N/A' },
                { id: 'tripStartDate', Header: 'Trip Start Date', accessor: s => s.trip ? s.trip.startDate || 'N/A' : 'N/A' },
                { id: 'tripStartTime', Header: 'Trip Start Time', accessor: s => s.trip ? s.trip.startTime || 'N/A' : 'N/A' },
                { id: 'tripScheduleRelationship', Header: 'Trip Schedule Relationship', accessor: s => s.trip ? getEnumKeyFromValue(s.trip.scheduleRelationship, TripScheduleRelationship) : 'N/A' }
            ]} />
        );
    }
}
