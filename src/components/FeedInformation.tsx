import * as React from 'react';

import { FeedMessage } from '../classes/FeedMessage';

import AlertInfo from './AlertInfo';
import FeedHeaderInfo from './FeedHeaderInfo';
import TripUpdateGrid from './TripUpdateGrid';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import VehiclePositionGrid from './VehiclePositionGrid';
import VehiclePositionMap from './VehiclePositionMap';

import "react-tabs/style/react-tabs.css";

export interface IFeedInformationProps {
    feedMessage?: FeedMessage;
}

export default class FeedInformation extends React.Component<IFeedInformationProps> {
    public render() {
        if (!this.props.feedMessage) { return null; }
        
        const vehiclesEntities = this.props.feedMessage.entity.filter(e => !!e.vehicle);
        const alertEntities = this.props.feedMessage.entity.filter(e => !!e.alert);
        const tripEntities = this.props.feedMessage.entity.filter(e => !!e.tripUpdate);
        return (
            <div>
                <FeedHeaderInfo feedHeader={this.props.feedMessage.header} />
                <Tabs>
                    <TabList>
                        {vehiclesEntities.length > 0 && <Tab>Vehicle Info</Tab>}
                        {vehiclesEntities.length > 0 && <Tab>Vehicle Map</Tab>}
                        {alertEntities.length > 0 && <Tab>Alert Info</Tab>}
                        {tripEntities.length > 0 && <Tab>Trip Update Info</Tab>}
                    </TabList>

                    {vehiclesEntities.length > 0 &&
                    <TabPanel>
                        <VehiclePositionGrid vehiclePositions={vehiclesEntities} />
                    </TabPanel>}
                    {vehiclesEntities.length > 0 &&
                    <TabPanel>
                        <VehiclePositionMap vehiclePositions={vehiclesEntities} />
                    </TabPanel>}
                    {alertEntities.length > 0 &&
                    <TabPanel>
                        <AlertInfo alerts={alertEntities} />
                    </TabPanel>}
                    {tripEntities.length > 0 &&
                    <TabPanel>
                        <TripUpdateGrid tripUpdates={tripEntities} />
                    </TabPanel>}
                </Tabs>
            </div>
        );
    }
}
