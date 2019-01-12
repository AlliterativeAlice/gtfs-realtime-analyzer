import * as React from 'react';

export interface ISelectListProps {
    label: string;
    initialSelectedOption: string | null;
    options: string[] | null;
    onSelect?: (selectedOption: string) => void;
}

export interface ISelectListState {
    selectedOption: string | null;
}

export default class SelectList extends React.Component<ISelectListProps, ISelectListState> {
    constructor(props: ISelectListProps) {
        super(props);

        this.state = {
            selectedOption: this.props.initialSelectedOption
        }
    }

    public componentDidUpdate(prevProps: ISelectListProps) {
        if (prevProps.initialSelectedOption !== this.props.initialSelectedOption) {
            this.setState({selectedOption: this.props.initialSelectedOption});
        }
    }

    public selectOption(option: string) {
        if (this.state.selectedOption !== option) {
            this.setState({selectedOption: option});
            if (this.props.onSelect) { this.props.onSelect(option); }
        }
    }

    public render() {
        if (!this.props.options || this.props.options.length <= 1) { return null; }
        return (
            <div>
                <span>{this.props.label}: </span>
                {this.props.options.map(o => <button className={'select-list-button' + (this.state.selectedOption === o ? ' selected' : '')} key={o} onClick={() => this.selectOption(o)}>{o}</button>)}
            </div>
        );
    }
}
