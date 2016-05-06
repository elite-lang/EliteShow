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
        if (Array.isArray(this.props.data)) {
            var arr = []
            var obj = this.props.data as Object
            for (var i in obj) {
                arr.push(<p key={i}>{obj[i]}</p>)
            }
            return <div>
                {arr}
            </div>
        } else {
            var arr = []
            var obj = this.props.data as Object
            for (var q in obj) {
                arr.push(<p key={q}>{q+" : "+obj[q]}</p>)
            }
            return <div>
                {arr}
            </div>
        }

    }
}
