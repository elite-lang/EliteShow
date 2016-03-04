"use strict";
import * as React from 'react';
const Row = require('antd/lib/row');
const Col = require('antd/lib/col');
const Icon = require('antd/lib/icon');
const jquery = require('jquery');
require('graphviz.svg');

export class LexDfa extends React.Component<any, any> {
    private url: string;
    private dfa;
    constructor(props) {
        super(props)
        this.url = props.url;
    }

    render() {
        return <div>
            <div ref='gv-graph' className='gv-graph' />
        </div>
    }

    componentWillUpdate(nextProps, nextState) {
        var $set = jquery()
        if (nextProps.show != undefined)
            $set = jquery('[data-name="state' + nextProps.show + '"]')
        this.dfa.highlight($set, true)
        this.dfa.colorMainElement($set)
        this.dfa.bringToFront($set)
    }

    componentDidMount() {
        var that = this
        jquery(this.refs['gv-graph']).graphviz({
            url: this.url,
            ready: function() {
                var gv = this
                that.dfa = gv
                gv.nodes().click(function () {
                    var $set = jquery()
                    $set.push(this)
                    $set = $set.add(gv.linkedFrom(this, true))
                    $set = $set.add(gv.linkedTo(this, true))
                    gv.highlight($set, true)
                    gv.colorMainElement(jquery(this))
                    gv.bringToFront($set)
                })
            }
        });
    }

}
