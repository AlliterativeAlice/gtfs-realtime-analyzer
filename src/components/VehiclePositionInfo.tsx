import * as React from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

import { FeedEntity } from '../classes/FeedMessage';
import VehiclePositionGrid from './VehiclePositionGrid';
import VehiclePositionMap from './VehiclePositionMap';

import "react-tabs/style/react-tabs.css";

export interface IVehiclePositionInfoProps {
    vehiclePositions: FeedEntity[];
}

export default class VehiclePositionInfo extends React.Component<IVehiclePositionInfoProps, any> {
    public render() {
        return (
            <Tabs>
                <TabList>
                    <Tab>Grid View</Tab>
                    <Tab>Map View</Tab>
                </TabList>

                <TabPanel>
                    <VehiclePositionGrid vehiclePositions={this.props.vehiclePositions} />
                </TabPanel>
                <TabPanel>
                    <VehiclePositionMap vehiclePositions={this.props.vehiclePositions} />
                </TabPanel>
            </Tabs>
        );
    }
}
