import {Cause, CongestionLevel, Effect, Incrementality, OccupancyStatus, StopTimeScheduleRelationship, TripScheduleRelationship, VehicleStopStatus} from './FeedMessageEnums'

export class FeedMessage {
    header: FeedHeader;
    entity: FeedEntity[];
}
export class FeedHeader {
    gtfsRealtimeVersion: string;
    incrementality?: Incrementality;
    timestamp?: number;
}
export class FeedEntity {
    id: string;
    isDeleted?: boolean;
    tripUpdate?: TripUpdate;
    vehicle?: VehiclePosition;
    alert?: Alert;
}

export class StopTimeEvent {
    delay?: number;
    time?: number;
    uncertainty?: number;
}

export class StopTimeUpdate {
    stopSequence?: number;
    stopId?: string;
    arrival?: StopTimeEvent;
    departure?: StopTimeEvent;
    scheduleRelationship?: StopTimeScheduleRelationship;
}

export class TripUpdate {
    trip: TripDescriptor;
    vehicle?: VehicleDescriptor;
    stopTimeUpdate: StopTimeUpdate[];
    timestamp?: number;
    delay?: number;
}

export class VehiclePosition {
    trip?: TripDescriptor;
    vehicle?: VehicleDescriptor;
    position?: Position;
    currentStopSequence?: number;
    stopId?: string;
    currentStatus?: VehicleStopStatus;
    timestamp?: number;
    congestionLevel?: CongestionLevel;
    occupancyStatus?: OccupancyStatus;
}

export class Alert {
    activePeriod: TimeRange[];
    informedEntity: EntitySelector[];
    cause?: Cause;
    effect?: Effect;
    url?: TranslatedString;
    headerText?: TranslatedString;
    descriptionText?: TranslatedString;
}

export class TimeRange {
    start?: number;
    end?: number;
}

export class Position {
    latitude: number;
    longitude: number;
    bearing?: number;
    odometer?: number;
    speed?: number;
}

export class Translation {
    text: string;
    language?: string;

}

export class TranslatedString {
    translation: Translation[];
}

export class TripDescriptor {
    tripId?: string;
    routeId?: string;
    directionId?: number;
    startTime?: string;
    startDate?: string;
    scheduleRelationship?: TripScheduleRelationship;
}

export class EntitySelector {
    agencyId?: string;
    routeId?: string;
    routeType?: string;
    trip?: TripDescriptor;
    stopId?: string;
}

export class VehicleDescriptor {
    id?: string;
    label?: string;
    licensePlate?: string;
}