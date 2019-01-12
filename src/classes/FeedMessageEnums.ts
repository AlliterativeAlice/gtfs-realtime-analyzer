export enum Incrementality {
    FULL_DATASET = 0,
    DIFFERENTIAL = 1
}

export enum TripScheduleRelationship {
    SCHEDULED = 0,
    ADDED = 1,
    UNSCHEDULED = 2,
    CANCELED = 3
}

export enum StopTimeScheduleRelationship {
    SCHEDULED = 0,
    SKIPPED = 1,
    NO_DATA = 2,
}

export enum OccupancyStatus {
    EMPTY = 0,
    MANY_SEATS_AVAILABLE = 1,
    FEW_SEATS_AVAILABLE = 2,
    STANDING_ROOM_ONLY = 3,
    CRUSHED_STANDING_ROOM_ONLY = 4,
    FULL = 5,
    NOT_ACCEPTING_PASSENGERS = 6
}

export enum Cause {
    UNKNOWN_CAUSE = 1,
    OTHER_CAUSE = 2,
    TECHNICAL_PROBLEM = 3,
    STRIKE = 4,
    DEMONSTRATION = 5,
    ACCIDENT = 6,
    HOLIDAY = 7,
    WEATHER = 8,
    MAINTENANCE = 9,
    CONSTRUCTION = 10,
    POLICE_ACTIVITY = 11,
    MEDICAL_EMERGENCY = 12
}

export enum Effect {
    NO_SERVICE = 1,
    REDUCED_SERVICE = 2,
    SIGNIFICANT_DELAYS = 3,
    DETOUR = 4,
    ADDITIONAL_SERVICE = 5,
    MODIFIED_SERVICE = 6,
    OTHER_EFFECT = 7,
    UNKNOWN_EFFECT = 8,
    STOP_MOVED = 9
}

export enum VehicleStopStatus {
    INCOMING_AT = 0,
    STOPPED_AT = 1,
    IN_TRANSIT_TO = 2
}

export enum CongestionLevel {
    UNKNOWN_CONGESTION_LEVEL = 0,
    RUNNING_SMOOTHLY = 1,
    STOP_AND_GO = 2,
    CONGESTION = 3,
    SEVERE_CONGESTION = 4
}