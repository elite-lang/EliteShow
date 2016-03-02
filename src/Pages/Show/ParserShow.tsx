"use strict";
import * as React from 'react';
const Row = require('antd/lib/row');
const Col = require('antd/lib/col');
import { LexDfa } from '../Show/LexDfa';
import { ShowList } from '../Show/ShowList';
import { VisTree } from '../Show/VisTree';
import {App} from '../Class/app';
import {BnfList} from '../Class/bnfList';

export class ParserShow extends React.Component<any, any> {
    private data: App;
    private bnf_list: BnfList;

    constructor(props) {
        super(props)
        this.data = this.props.data
        this.bnf_list = this.data.loader.bnf_list
    }

    render() {
        return <Row>
            <Col span="18"><LexDfa url={this.data.svgfile} /></Col>
            <Col span="6" style={{padding: '10px 15px'}}>
                <h3>BNF列表</h3>
                <ShowList data={this.bnf_list.render()} />
                <ShowList data={this.bnf_list.render()} />
            </Col>
        </Row>
    }

}
