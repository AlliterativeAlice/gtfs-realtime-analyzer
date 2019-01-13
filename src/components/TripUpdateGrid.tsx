import * as React from 'react';
import ReactTable from "react-table";

import { FeedEntity, StopTimeUpdate } from '../classes/FeedMessage';
import { TripScheduleRelationship } from '../classes/FeedMessageEnums';
import { formatTimestamp, getEnumKeyFromValue } from '../util/FormatUtil';

import 'react-table/react-table.css'
import StopTimeUpdateGrid from './StopTimeUpdateGrid';
import ModalWindow from './ModalWindow';

export interface ITripUpdateGridState {
    selectedStopTimeUpdates: StopTimeUpdate[] | null;
}

export interface ITripUpdateGridProps {
    tripUpdates: FeedEntity[];
}

export default class TripUpdateGrid extends React.Component<ITripUpdateGridProps, ITripUpdateGridState> {

    constructor(props: ITripUpdateGridProps) {
        super(props);

        this.state = {
            selectedStopTimeUpdates: null
        }
    }

    public closeStopTimeUpdateModal = () => {
        this.setState({selectedStopTimeUpdates: null});
    }

    public render() {
        
        const tripUpdates = this.props.tripUpdates.filter(t => !!t.tripUpdate);
        return (
            <React.Fragment>
                <ReactTable minRows={1} data={tripUpdates} columns={[
                    { id: 'id', Header: 'ID', accessor: t => t.id },
                    { id: 'isDeleted', Header: 'Is Deleted', accessor: t => typeof t.isDeleted === 'boolean' ? t.isDeleted.toString() : 'N/A' },
                    { id: 'tripId', Header: 'Trip ID', accessor: t => t.tripUpdate!.trip && t.tripUpdate!.trip.tripId ? t.tripUpdate!.trip.tripId : 'N/A' },
                    { id: 'directionId', Header: 'Direction ID', accessor: t => t.tripUpdate!.trip && t.tripUpdate!.trip.directionId ? t.tripUpdate!.trip.directionId : 'N/A' },
                    { id: 'routeId', Header: 'Route ID', accessor: t => t.tripUpdate!.trip && t.tripUpdate!.trip.routeId ? t.tripUpdate!.trip.routeId : 'N/A' },
                    { id: 'startDate', Header: 'Start Date', accessor: t => t.tripUpdate!.trip && t.tripUpdate!.trip.startDate ? t.tripUpdate!.trip.startDate : 'N/A' },
                    { id: 'startTime', Header: 'Start Time', accessor: t => t.tripUpdate!.trip && t.tripUpdate!.trip.startTime ? t.tripUpdate!.trip.startTime : 'N/A' },
                    { id: 'scheduleRelationship', Header: 'Schedule Relationship', accessor: t => getEnumKeyFromValue(t.tripUpdate!.trip ? t.tripUpdate!.trip.scheduleRelationship : undefined, TripScheduleRelationship) },
                    { id: 'timestamp', Header: 'Timestamp', accessor: t => t.tripUpdate!.timestamp, Cell: props => formatTimestamp(props.value) },
                    { id: 'delay', Header: 'Delay', accessor: t => !t.tripUpdate!.delay && t.tripUpdate!.delay !== 0 ? 'N/A' : t.tripUpdate!.delay },
                    { id: 'stopTimeUpdates', Header: 'Stop Time Updates', accessor: t => t.tripUpdate!.stopTimeUpdate && t.tripUpdate!.stopTimeUpdate.length > 0 ? <button onClick={() => this.setState({selectedStopTimeUpdates: t.tripUpdate!.stopTimeUpdate})}>Click to See</button> : 'N/A' },
                    { id: 'vehicleId', Header: 'Vehicle ID', accessor: t => t.tripUpdate!.vehicle && t.tripUpdate!.vehicle!.id ? t.tripUpdate!.vehicle!.id : 'N/A' },
                    { id: 'vehicleLabel', Header: 'Vehicle Label', accessor: t => t.tripUpdate!.vehicle && t.tripUpdate!.vehicle!.label ? t.tripUpdate!.vehicle!.label : 'N/A' },
                    { id: 'licensePlate', Header: 'License Plate', accessor: t => t.tripUpdate!.vehicle && t.tripUpdate!.vehicle!.licensePlate ? t.tripUpdate!.vehicle!.licensePlate : 'N/A' },
                ]} />
                <ModalWindow isOpen={!!this.state.selectedStopTimeUpdates} onClosed={this.closeStopTimeUpdateModal}>
                    <h2>Stop Time Updates</h2>
                    <StopTimeUpdateGrid stopTimeUpdates={this.state.selectedStopTimeUpdates} />
                </ModalWindow>
            </React.Fragment>
        );
    }
}
