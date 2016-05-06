"use strict";
import * as React from 'react';
const Row = require('antd/lib/row');
const Col = require('antd/lib/col');
import { LexDfa } from './LexDfa';
import { ShowList } from './ShowList';
import { App } from '../Class/app';

export class LexShow extends React.Component<any, any> {
    private data: App;
    constructor(props) {
        super(props)
        this.data = this.props.data
    }
    render() {
        return <div>
            <Col span="18"><LexDfa url={this.data.cmd_runner.svgfile_lex} /></Col>
            <Col span="6" style={{padding: '10px 15px'}}>
                <h3>正则式列表</h3>
                <ShowList data={this.data.lex_loader.getNames()}/>
            </Col>
        </div>
    }
}
