"use strict";
import * as React from 'react';
const Row = require('antd/lib/row');
const Col = require('antd/lib/col');
const Icon = require('antd/lib/icon');
import {CodeEditor} from './code-editor';


export class ConfigPage extends React.Component<any, any> {
    onLeftChange(e: string) {

    }
    onRightChange(e: string) {

    }
    render() {
        return <div className="page-container">
                <div className='code-page-header'>
                    <h1><Icon type="setting" /> 配置管理</h1>
                </div>
                <Row className="config-page-edit">
                    <Col span='12' className='editor-container'>
                        <CodeEditor name='left-code-editor' title='词法分析配置' onChange={this.onLeftChange} />
                    </Col>
                    <Col span='12' className='editor-container'>
                        <CodeEditor name='right-code-editor' title='语法分析配置' onChange={this.onRightChange} />
                    </Col>
                </Row>
            </div>
    }
}
