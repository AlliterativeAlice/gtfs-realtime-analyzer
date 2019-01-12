import * as React from 'react';
import ReactTable from "react-table";

import { EntitySelector, FeedEntity } from '../classes/FeedMessage';
import { Cause, Effect } from '../classes/FeedMessageEnums';
import { formatTimestamp, getEnumKeyFromValue, getTranslatedStringVal } from '../util/FormatUtil';

import 'react-table/react-table.css'

export interface IAlertGridProps {
    alerts: FeedEntity[];
    language: string | null;
}

export default class AlertGrid extends React.Component<IAlertGridProps> {

    public getInformedEntityJSX(informedEntities: EntitySelector[]): JSX.Element[] {
        return informedEntities.map((informedEntity, i) => {
            if (!informedEntity) { return <p key={i}>N/A</p> }
            const informedEntityStrArr = [];
            if (informedEntity.agencyId) { informedEntityStrArr.push(`Agency ${informedEntity.agencyId}`); }
            if (informedEntity.routeId) { informedEntityStrArr.push(`Route ${informedEntity.routeType || ''} ${informedEntity.routeId || ''}`); }
            if (informedEntity.stopId) { informedEntityStrArr.push(`Stop ${informedEntity.stopId}`); }
            if (informedEntity.trip) { informedEntityStrArr.push(`Trip ${informedEntity.trip.tripId}`); }
            return <p key={i}>{informedEntityStrArr.length > 0 ? informedEntityStrArr.join(', ') : 'N/A'}</p>
        });
    }

    public splitByActivePeriod(alerts: FeedEntity[]): FeedEntity[] {
        const splitAlerts: FeedEntity[] = [];
        alerts.forEach(a => {    
            if (a.alert!.activePeriod && a.alert!.activePeriod.length > 1) {
                a.alert!.activePeriod.forEach(ap => {
                    const splitAlert = Object.assign({}, a);
                    splitAlert.alert = Object.assign({}, a.alert);
                    splitAlert.alert.activePeriod = [ap];
                    splitAlerts.push(splitAlert);
                });
            }
            else { splitAlerts.push(a); }
        });
        return splitAlerts;
    }

    public render() {
        const alerts = this.props.alerts.filter(a => !!a.alert);
        return (
            <ReactTable data={this.splitByActivePeriod(alerts)} columns={[
                { id: 'id', Header: 'ID', accessor: a => a.id },
                { id: 'isDeleted', Header: 'Is Deleted', accessor: a => typeof a.isDeleted === 'boolean' ? a.isDeleted.toString() : 'N/A' },
                { id: 'start', Header: 'Start', accessor: a => formatTimestamp(a.alert!.activePeriod && a.alert!.activePeriod.length > 0 ? a.alert!.activePeriod[0].start : undefined) },
                { id: 'end', Header: 'End', accessor: a => formatTimestamp(a.alert!.activePeriod && a.alert!.activePeriod.length > 0 ? a.alert!.activePeriod[0].end : undefined) },
                { id: 'header', Header: 'Header', accessor: a =>  getTranslatedStringVal(this.props.language, a.alert!.headerText) },
                { id: 'description', Header: 'Description', accessor: a =>  getTranslatedStringVal(this.props.language, a.alert!.descriptionText) },
                { id: 'cause', Header: 'Cause', accessor: a => getEnumKeyFromValue(a.alert!.cause, Cause) },
                { id: 'effect', Header: 'Effect', accessor: a => getEnumKeyFromValue(a.alert!.effect, Effect) },
                { id: 'informedEntity', Header: 'Informed Entity', accessor: a => a.alert!.informedEntity ? this.getInformedEntityJSX(a.alert!.informedEntity) : 'N/A'},
                { id: 'url', Header: 'URL', accessor: a => getTranslatedStringVal(this.props.language, a.alert!.url) }
            ]} />
        );
    }
}
