"use strict";
import * as React from 'react';
const Row = require('antd/lib/row');
const Col = require('antd/lib/col');
const Icon = require('antd/lib/icon');
import {CodeEditor} from './code-editor';
import {App} from './Class/app';

export class ConfigPage extends React.Component<any, any> {
    private data : App
    constructor(props) {
        super(props)
        this.onLeftChange = this.onLeftChange.bind(this)
        this.onRightChange = this.onRightChange.bind(this)
        this.data = props.data;
    }
    onLeftChange(e: string) {
        this.data.lex_cfg = e
    }
    onRightChange(e: string) {
        this.data.parser_cfg = e
    }

    render() {
        return <div className="page-container">
                <div className='code-page-header'>
                    <h1><Icon type="setting" /> 配置管理</h1>
                </div>
                <Row className="config-page-edit">
                    <Col span='12' className='editor-container'>
                        <CodeEditor name='left-code-editor' title='词法分析配置'
                            data={this.data.lex_cfg} onChange={this.onLeftChange}
                            onUpdate={this.data.UpdataData} />
                    </Col>
                    <Col span='12' className='editor-container'>
                        <CodeEditor name='right-code-editor' title='语法分析配置'
                            data={this.data.parser_cfg} onChange={this.onRightChange}
                            onUpdate={this.data.UpdataData} />
                    </Col>
                </Row>
            </div>
    }
}
