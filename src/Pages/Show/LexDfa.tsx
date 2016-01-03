"use strict";
import * as React from 'react';
const Row = require('antd/lib/row');
const Col = require('antd/lib/col');
const Icon = require('antd/lib/icon');
const jquery = require('jquery');
require('graphviz.svg');

export class LexDfa extends React.Component<any, any> {
    render() {
        return <div>
            <div id='gv-graph'  />
        </div>
    }
    componentDidMount() {
        jquery("#gv-graph").graphviz({
            url: "img/demo.svg",
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
