import { parse } from "protobufjs";
import FeedType from '../enum/FeedType';
import { FeedMessage } from '../classes/FeedMessage';
import gtfsRealtimeProto from '../data/gtfs-realtime-proto';



export function getFeedMessageFromBinaryString(binaryString: ArrayBuffer): FeedMessage  {
    const root = parse(gtfsRealtimeProto).root;
    const type = root.lookupType('transit_realtime.FeedMessage');
    return (type.decode(new Uint8Array(binaryString)) as unknown) as FeedMessage;
}

export function getFeedTypes(feed?: FeedMessage): FeedType[] {
    if (!feed || !feed.entity) return [];
    const feedTypes: FeedType[] = [];

    if (feed.entity.some(e => !!e.vehicle)) feedTypes.push(FeedType.VehiclePosition);
    if (feed.entity.some(e => !!e.alert)) feedTypes.push(FeedType.Alert);
    if (feed.entity.some(e => !!e.tripUpdate)) feedTypes.push(FeedType.TripUpdate);
    return feedTypes;
}