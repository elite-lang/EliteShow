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

        } else {
            var arr = []
            var obj = this.props.data as Object
            for (var q in obj) {
                arr.push(<p key={q}>{q+" : "+obj[q]}</p>)
            }
        }
        return <div ref='slist' className="show-list">
            {arr}
        </div>
    }

    componentWillUpdate(nextProps, nextState) {
        var obj:any = this.refs['slist']
        obj.scrollTop = 100000;
    }
}
