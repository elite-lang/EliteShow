"use strict";
import * as React from 'react';

interface ShowListState {
    items : any[]
}

export class ShowList extends React.Component<any, ShowListState> {

    constructor(props) {
        super(props)
    }

    private static defaultProps = {
        data: []
    };

    render() {
        return <div>
            {this.props.data}
        </div>
    }
}
