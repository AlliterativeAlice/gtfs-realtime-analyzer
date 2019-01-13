import * as React from 'react';
import ReactTable from "react-table";

import { EntitySelector, FeedEntity } from '../classes/FeedMessage';
import { Cause, Effect } from '../classes/FeedMessageEnums';
import { formatTimestamp, getEnumKeyFromValue, getTranslatedStringVal } from '../util/FormatUtil';

import 'react-table/react-table.css'
import ModalWindow from './ModalWindow';
import InformedEntityGrid from './InformedEntityGrid';

export interface IAlertGridProps {
    alerts: FeedEntity[];
    language: string | null;
}

export interface IAlertGridState {
    selectedInformedEntities: EntitySelector[] | null;
}

export default class AlertGrid extends React.Component<IAlertGridProps, IAlertGridState> {

    constructor(props: IAlertGridProps) {
        super(props);
        
        this.state = {
            selectedInformedEntities: null
        };
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

    public deselectInformedEntities = () => {
        this.setState({selectedInformedEntities: null});
    }

    public render() {
        const alerts = this.props.alerts.filter(a => !!a.alert);
        return (
            <React.Fragment>
                <ReactTable minRows={1} data={this.splitByActivePeriod(alerts)} columns={[
                    { id: 'id', Header: 'ID', accessor: a => a.id },
                    { id: 'isDeleted', Header: 'Is Deleted', accessor: a => typeof a.isDeleted === 'boolean' ? a.isDeleted.toString() : 'N/A' },
                    { id: 'start', Header: 'Start', accessor: a => a.alert!.activePeriod && a.alert!.activePeriod.length > 0 ? a.alert!.activePeriod[0].start : undefined, Cell: props => formatTimestamp(props.value) },
                    { id: 'end', Header: 'End', accessor: a => a.alert!.activePeriod && a.alert!.activePeriod.length > 0 ? a.alert!.activePeriod[0].end : undefined, Cell: props => formatTimestamp(props.value) },
                    { id: 'header', Header: 'Header', accessor: a =>  getTranslatedStringVal(this.props.language, a.alert!.headerText) },
                    { id: 'description', Header: 'Description', accessor: a =>  getTranslatedStringVal(this.props.language, a.alert!.descriptionText) },
                    { id: 'cause', Header: 'Cause', accessor: a => getEnumKeyFromValue(a.alert!.cause, Cause) },
                    { id: 'effect', Header: 'Effect', accessor: a => getEnumKeyFromValue(a.alert!.effect, Effect) },
                    { id: 'informedEntity', Header: 'Informed Entity', accessor: a => a.alert!.informedEntity && a.alert!.informedEntity.length > 0 ? <button onClick={() => this.setState({selectedInformedEntities: a.alert!.informedEntity})}>Click to See</button> : 'N/A' },
                    { id: 'url', Header: 'URL', accessor: a => getTranslatedStringVal(this.props.language, a.alert!.url) }
                ]} />
                <ModalWindow isOpen={!!this.state.selectedInformedEntities} onClosed={this.deselectInformedEntities}>
                        <h2>Informed Entities</h2>
                        <InformedEntityGrid informedEntities={this.state.selectedInformedEntities} />
                </ModalWindow>
            </React.Fragment>
        );
    }
}
