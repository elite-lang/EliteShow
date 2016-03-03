"use strict";
import * as React from 'react';
const Row = require('antd/lib/row');
const Col = require('antd/lib/col');
import { LexDfa } from '../Show/LexDfa';
import { ShowList } from '../Show/ShowList';
import { VisTree } from '../Show/VisTree';
import {App} from '../Class/app';
import {BnfList} from '../Class/bnfList';
import {Core, line} from '../Class/Model';

export class ParserShow extends React.Component<any, any> {
    private data: App;
    private bnf_list: BnfList;

    private num: number;
    private list: line[];

    constructor(props) {
        super(props)
        this.data = this.props.data
        this.bnf_list = this.data.loader.bnf_list
        this.list = this.data.loader.core.list
        this.num = 0
    }

    render() {
        var index = this.list[this.num].next
        var str = this.data.loader.vmap.find(index) + '  ' + index
        return <Row>
            <Col span="18"><LexDfa url={this.data.svgfile} /></Col>
            <Col span="6" style={{padding: '10px 15px'}}>
                <h3>BNF列表</h3>
                <ShowList data={this.bnf_list.render()} />
                <br/><hr/><br/>
                <h3>下一个Token：</h3>
                <h1>{str}</h1>
                <br/><hr/><br/>
                <ShowList />
            </Col>
        </Row>
    }

}
