"use strict";
import * as React from 'react';
const Row = require('antd/lib/row');
const Col = require('antd/lib/col');
const Icon = require('antd/lib/icon');
const jquery = require('jquery');
require('graphviz.svg');

export class LexDfa extends React.Component<any, any> {
    private url: string;

    constructor(props) {
        super(props)
        this.url = props.url;
    }

    render() {
        return <div>
            <div ref='gv-graph' className='gv-graph' />
        </div>
    }
    componentDidMount() {
        jquery(this.refs['gv-graph']).graphviz({
        // jquery('#gv-graph').graphviz({
            url: this.url,
            ready: function() {
                var gv = this
                gv.nodes().click(function () {
                    var $set = jquery()
                    $set.push(this)
                    $set = $set.add(gv.linkedFrom(this, true))
                    $set = $set.add(gv.linkedTo(this, true))
                    gv.highlight($set, true)
                    gv.bringToFront($set)
                })
            }
        });
    }

}
