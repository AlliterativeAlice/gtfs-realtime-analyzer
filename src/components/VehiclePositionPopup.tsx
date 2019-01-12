import * as React from 'react';

import { FeedEntity } from '../classes/FeedMessage';
import { CongestionLevel, OccupancyStatus, TripScheduleRelationship, VehicleStopStatus } from '../classes/FeedMessageEnums';
import { formatTimestamp, getEnumKeyFromValue } from '../util/FormatUtil';

import './VehiclePositionPopup.css';

export interface IVehiclePositionPopupProps {
    vehiclePosition: FeedEntity;
}

export default class VehiclePositionPopup extends React.Component<IVehiclePositionPopupProps> {
    constructor(props: IVehiclePositionPopupProps) {
        super(props);
    }

    public render() {
        return (
            <div className="vehicle-position-info">
                <p>ID: {this.props.vehiclePosition.id}</p>
                <p>Is Deleted: {typeof this.props.vehiclePosition.isDeleted === 'boolean' ? this.props.vehiclePosition.isDeleted.toString() : 'N/A'}</p>
                <p>Vehicle ID: {this.props.vehiclePosition.vehicle!.vehicle && this.props.vehiclePosition.vehicle!.vehicle!.id ? this.props.vehiclePosition.vehicle!.vehicle!.id : "N/A"}</p>
                <p>Vehicle Label: {this.props.vehiclePosition.vehicle!.vehicle && this.props.vehiclePosition.vehicle!.vehicle!.label ? this.props.vehiclePosition.vehicle!.vehicle!.label : "N/A"}</p>
                <p>Vehicle License: {this.props.vehiclePosition.vehicle!.vehicle && this.props.vehiclePosition.vehicle!.vehicle!.licensePlate ? this.props.vehiclePosition.vehicle!.vehicle!.licensePlate : "N/A"}</p>
                <p>Congestion Level: {getEnumKeyFromValue(this.props.vehiclePosition.vehicle!.congestionLevel, CongestionLevel)}</p>
                <p>Current Status: {getEnumKeyFromValue(this.props.vehiclePosition.vehicle!.currentStatus, VehicleStopStatus)}</p>
                <p>Current Stop Sequence: {this.props.vehiclePosition.vehicle!.currentStopSequence || "N/A"}</p>
                <p>Occupancy Status: {getEnumKeyFromValue(this.props.vehiclePosition.vehicle!.occupancyStatus, OccupancyStatus)}</p>
                <p>Latitude: {this.props.vehiclePosition.vehicle!.position && this.props.vehiclePosition.vehicle!.position!.latitude ? this.props.vehiclePosition.vehicle!.position!.latitude : "N/A"}</p>
                <p>Longitude: {this.props.vehiclePosition.vehicle!.position && this.props.vehiclePosition.vehicle!.position!.longitude ? this.props.vehiclePosition.vehicle!.position!.longitude : "N/A"}</p>
                <p>Bearing: {this.props.vehiclePosition.vehicle!.position && this.props.vehiclePosition.vehicle!.position!.bearing ? this.props.vehiclePosition.vehicle!.position!.bearing : "N/A"}</p>
                <p>Odometer: {this.props.vehiclePosition.vehicle!.position && this.props.vehiclePosition.vehicle!.position!.odometer ? this.props.vehiclePosition.vehicle!.position!.odometer : "N/A"}</p>
                <p>Speed: {this.props.vehiclePosition.vehicle!.position && this.props.vehiclePosition.vehicle!.position!.speed ? this.props.vehiclePosition.vehicle!.position!.speed : "N/A"}</p>
                <p>Stop ID: {this.props.vehiclePosition.vehicle!.stopId || "N/A"}</p>
                <p>Timestamp: {formatTimestamp(this.props.vehiclePosition.vehicle!.timestamp)}</p>
                <p>Direction ID: {this.props.vehiclePosition.vehicle!.trip && this.props.vehiclePosition.vehicle!.trip!.directionId ? this.props.vehiclePosition.vehicle!.trip!.directionId : "N/A"}</p>
                <p>Route ID: {this.props.vehiclePosition.vehicle!.trip && this.props.vehiclePosition.vehicle!.trip!.routeId ? this.props.vehiclePosition.vehicle!.trip!.routeId : "N/A"}</p>
                <p>Trip ID: {this.props.vehiclePosition.vehicle!.trip && this.props.vehiclePosition.vehicle!.trip!.tripId ? this.props.vehiclePosition.vehicle!.trip!.tripId : "N/A"}</p>
                <p>Start Date: {this.props.vehiclePosition.vehicle!.trip && this.props.vehiclePosition.vehicle!.trip!.startDate ? this.props.vehiclePosition.vehicle!.trip!.startDate : "N/A"}</p>
                <p>Start Time: {this.props.vehiclePosition.vehicle!.trip && this.props.vehiclePosition.vehicle!.trip!.startTime ? this.props.vehiclePosition.vehicle!.trip!.startTime : "N/A"}</p>
                <p>Schedule Relationship: {getEnumKeyFromValue(this.props.vehiclePosition.vehicle!.trip ? this.props.vehiclePosition.vehicle!.trip!.scheduleRelationship : undefined, TripScheduleRelationship)}</p>
            </div>
        );
    }
}
