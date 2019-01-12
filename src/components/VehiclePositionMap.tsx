import 'leaflet/dist/leaflet.css';

import * as L from 'leaflet';
import * as React from 'react';

import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { FeedEntity } from '../classes/FeedMessage';

import busIcon from '../images/bus.svg';
import VehiclePositionPopup from './VehiclePositionPopup';

import './VehiclePositionMap.css';

export interface IVehiclePositionMapProps {
    vehiclePositions: FeedEntity[];
}

export default class VehiclePositionMap extends React.Component<IVehiclePositionMapProps> {
    constructor(props: IVehiclePositionMapProps) {
        super(props);
    }

    public render() {

        const itemsWithPositions = this.props.vehiclePositions.filter(v => v.vehicle && v.vehicle.position);

        const markers = itemsWithPositions.map((v, i) => (
            <Marker key={i} icon={L.icon({iconUrl: busIcon, iconSize: [20, 20], iconAnchor: [10, 10]})} position={[v.vehicle!.position!.latitude, v.vehicle!.position!.longitude]}>
                <Popup>
                    <VehiclePositionPopup vehiclePosition={v} />
                </Popup>
            </Marker>
        ));
        return (
            <Map bounds={L.latLngBounds(itemsWithPositions.map(v => L.latLng([v.vehicle!.position!.latitude, v.vehicle!.position!.longitude])))}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors" />
                {markers}
            </Map>
        );
    }
}
