"use strict";
import * as React from 'react';
import {CodeEditor} from './Show/code-editor';
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
            <CodeEditor name='code-editor' title='代码编辑器'
                mode='c_cpp'
                settings={this.data.settings}
                data={this.data.code_data} onChange={this.onChange}
                onUpdate={this.data.UpdataData} />
            </div>
    }
}
