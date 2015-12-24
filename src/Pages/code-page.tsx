"use strict";
import * as React from 'react';
import {CodeEditor} from './code-editor';
import {App} from './Class/app';

export class CodePage extends React.Component<any, any> {
    private data: App
    constructor(prop) {
        super(prop)
        this.data = prop.data
        this.onChange = this.onChange.bind(this)
    }
    onChange(e: string) {
        this.data.code_data = e
    }
    render() {
        return <div className="page-container">
            <CodeEditor name='left-code-editor' title='词法分析配置'
                data={this.data.code_data} onChange={this.onChange}
                onUpdate={this.data.UpdataData} />
            </div>
    }
}
