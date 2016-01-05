"use strict";
import * as React from 'react';


interface ShowListState {
    items : any[]
}

export class ShowList extends React.Component<any, ShowListState> {

    constructor(props) {
        super(props)
        this.addItem = this.addItem.bind(this)
        this.state = { items: new Array() } as ShowListState
    }

    addItem(item) {
        this.state.items.unshift(item)
        this.setState({items: this.state.items})
    }

    render() {
        return <div>
            {this.state.items}
        </div>
    }
}