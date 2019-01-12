import * as React from 'react';

import { FeedEntity } from '../classes/FeedMessage';
import AlertGrid from './AlertGrid';
import SelectList from './SelectList';

export interface IAlertInfoProps {
    alerts: FeedEntity[];
}

export interface IAlertInfoState {
    language: string | null;
    languageOptions: string[];
}

export default class AlertInfo extends React.Component<IAlertInfoProps, IAlertInfoState> {

    constructor(props: IAlertInfoProps) {
        super(props);
        const initialLanguageOptions = this.getLanguageOptions();

        this.state = {
            language: initialLanguageOptions.length > 0 ? initialLanguageOptions[0] : null,
            languageOptions: initialLanguageOptions,
        }
    }

    public changeLanguage = (newLanguage: string) => {
        this.setState({language: newLanguage});
    }

    public getLanguageOptions(): string[] {
        // Iterate through all alerts and generate list of languages used in the header_text or descrition_text of any alert
        const languageOptions: string[] = [];
        this.props.alerts.forEach(a => {
            if (a.alert) {
                [a.alert.headerText, a.alert.descriptionText, a.alert.url].forEach(i => {
                    if (i && i.translation) {
                        i.translation.forEach(t => {
                            if (t.language && languageOptions.indexOf(t.language) === -1) { languageOptions.push(t.language) }
                        });
                    }
                });
            }
        });
        return languageOptions;
    }

    public render() {
        return (
            <React.Fragment>
                <SelectList label="Language" options={this.state.languageOptions} initialSelectedOption={this.state.languageOptions.length > 0 ? this.state.languageOptions[0] : null} onSelect={this.changeLanguage} />
                <AlertGrid alerts={this.props.alerts} language={this.state.language} />
            </React.Fragment>
        );
    }
}
