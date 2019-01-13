import * as React from 'react';
import ReactTable from "react-table";

import { FeedEntity } from '../classes/FeedMessage';
import { CongestionLevel, OccupancyStatus, TripScheduleRelationship, VehicleStopStatus } from '../classes/FeedMessageEnums';
import { formatTimestamp, getEnumKeyFromValue } from '../util/FormatUtil';

import 'react-table/react-table.css'

export interface IVehiclePositionGridProps {
    vehiclePositions: FeedEntity[];
}

export default class VehiclePositionGrid extends React.Component<IVehiclePositionGridProps> {
    constructor(props: IVehiclePositionGridProps) {
        super(props);

        this.state = {
        }
    }

    public render() {
        
        const vehicles = this.props.vehiclePositions.filter(v => !!v.vehicle);

        return (
            <ReactTable minRows={1}  data={vehicles} columns={[
                { id: 'id', Header: 'ID', accessor: v => v.id },
                { id: 'isDeleted', Header: 'Is Deleted', accessor: v => typeof v.isDeleted === 'boolean' ? v.isDeleted.toString() : 'N/A'},
                { id: 'vehicleId', Header: 'Vehicle ID', accessor: v => v.vehicle!.vehicle && v.vehicle!.vehicle!.id ? v.vehicle!.vehicle!.id : 'N/A' },
                { id: 'label', Header: 'Label', accessor: v => v.vehicle!.vehicle && v.vehicle!.vehicle!.label ? v.vehicle!.vehicle!.label : 'N/A' },
                { id: 'licensePlate', Header: 'License Plate', accessor: v => v.vehicle!.vehicle && v.vehicle!.vehicle!.licensePlate ? v.vehicle!.vehicle!.licensePlate : 'N/A' },
                { id: 'congestionLevel', Header: 'Congestion Level', accessor: v => getEnumKeyFromValue(v.vehicle!.congestionLevel, CongestionLevel) },
                { id: 'currentStatus', Header: 'Current Status', accessor: v => getEnumKeyFromValue(v.vehicle!.currentStatus, VehicleStopStatus) },
                { id: 'currentStopSequence', Header: 'Current Stop Sequence', accessor: v => v.vehicle!.currentStopSequence || 'N/A' },
                { id: 'occupancyStatus', Header: 'Occupancy Status', accessor: v => getEnumKeyFromValue(v.vehicle!.occupancyStatus, OccupancyStatus) },
                { id: 'latitude', Header: 'Latitude', accessor: v => v.vehicle!.position && v.vehicle!.position!.latitude ? v.vehicle!.position!.latitude : 'N/A' },
                { id: 'longitude', Header: 'Longitude', accessor: v => v.vehicle!.position && v.vehicle!.position!.longitude ? v.vehicle!.position!.longitude : 'N/A' },
                { id: 'bearing', Header: 'Bearing', accessor: v => v.vehicle!.position && v.vehicle!.position!.bearing ? v.vehicle!.position!.bearing : 'N/A' },
                { id: 'odometer', Header: 'Odometer', accessor: v => v.vehicle!.position && v.vehicle!.position!.odometer ? v.vehicle!.position!.odometer : 'N/A' },
                { id: 'speed', Header: 'Speed', accessor: v => v.vehicle!.position && v.vehicle!.position!.speed ? v.vehicle!.position!.speed : 'N/A' },
                { id: 'stopId', Header: 'Stop ID', accessor: v => v.vehicle!.stopId || 'N/A' },
                { id: 'timestamp', Header: 'Timestamp', accessor: v => v.vehicle!.timestamp, Cell: props => formatTimestamp(props.value) },
                { id: 'tripId', Header: 'Trip ID', accessor: v => v.vehicle!.trip && v.vehicle!.trip!.tripId ? v.vehicle!.trip!.tripId : 'N/A' },
                { id: 'directionId', Header: 'Direction ID', accessor: v => v.vehicle!.trip && v.vehicle!.trip!.directionId ? v.vehicle!.trip!.directionId : 'N/A' },
                { id: 'routeId', Header: 'Route ID', accessor: v => v.vehicle!.trip && v.vehicle!.trip!.routeId ? v.vehicle!.trip!.routeId : 'N/A' },
                { id: 'startDate', Header: 'Start Date', accessor: v => v.vehicle!.trip && v.vehicle!.trip!.startDate ? v.vehicle!.trip!.startDate : 'N/A' },
                { id: 'startTime', Header: 'Start Time', accessor: v => v.vehicle!.trip && v.vehicle!.trip!.startTime ? v.vehicle!.trip!.startTime : 'N/A' },
                { id: 'scheduleRelationship', Header: 'Schedule Relationship', accessor: v => getEnumKeyFromValue(v.vehicle!.trip ? v.vehicle!.trip!.scheduleRelationship : undefined, TripScheduleRelationship) },
            ]} />
        );
    }
}
