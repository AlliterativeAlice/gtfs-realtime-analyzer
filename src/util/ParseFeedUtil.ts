import { parse } from "protobufjs";
import FeedType from '../enum/FeedType';
import { FeedMessage } from '../classes/FeedMessage';
import gtfsRealtimeProto from '../data/gtfs-realtime-proto';


export function convertBinaryStringToUint8Array(binaryString: string) {
    const len = binaryString.length;
    const arr = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        arr[i] = binaryString.charCodeAt(i);
    }
    return arr;
}

export function getFeedMessageFromBinaryString(binaryString: string): FeedMessage  {
    const root = parse(gtfsRealtimeProto).root;
    const type = root.lookupType('transit_realtime.FeedMessage');
    return (type.decode(convertBinaryStringToUint8Array(binaryString)) as unknown) as FeedMessage;
}

export function getFeedTypes(feed?: FeedMessage): FeedType[] {
    if (!feed || !feed.entity) return [];
    const feedTypes: FeedType[] = [];

    if (feed.entity.some(e => !!e.vehicle)) feedTypes.push(FeedType.VehiclePosition);
    if (feed.entity.some(e => !!e.alert)) feedTypes.push(FeedType.Alert);
    if (feed.entity.some(e => !!e.tripUpdate)) feedTypes.push(FeedType.TripUpdate);
    return feedTypes;
}