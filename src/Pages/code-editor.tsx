"use strict";
import * as React from 'react';

var brace  = require('brace');
var AceEditor  = require('react-ace');
require('brace/mode/c_cpp')
require('brace/theme/monokai')
const Button = require('antd/lib/button');
const Icon = require('antd/lib/icon');
const ButtonGroup = Button.Group;
const fs = require("fs");
const remote = require('remote');
const dialog = remote.require('dialog');

interface _CodeEditorProps {
    name : string;
    title : string;
    data : string;
    onChange : (string) => any;
}

export class CodeEditor extends React.Component<any, any> {
    constructor(props: _CodeEditorProps) {
        super(props)
        this.onOpenFile = this.onOpenFile.bind(this)
        this.onSaveFile = this.onSaveFile.bind(this)
    }
    onOpenFile() {
        var that = this
        dialog.showOpenDialog((fileNames) => {
            if (fileNames === undefined) return;
            var fileName = fileNames[0];
            fs.readFile(fileName, 'utf-8', (err,data) => {
                if(err){
                    console.log("error")
                }else{
                    console.log(data)
                    console.log(that)
                    this.props.data = data
                }
            });
        });
    }
    onSaveFile() {
        // console.log(dialog.showSaveDialog());
    }

    render() {
        return <div className='editor-container'>
                <div className='code-page-header'>
                    <h2>{this.props.title} &nbsp;&nbsp;
                        <ButtonGroup>
                            <Button onClick={this.onOpenFile} type="primary"><Icon type="folder-open" />打开</Button>
                            <Button onClick={this.onSaveFile}><Icon type="save" />另存为</Button>
                        </ButtonGroup>
                    </h2>
                </div>
                <div className="code-page-edit">
                    <AceEditor
                       width="100%"
                       height="100%"
                       mode="c_cpp"
                       theme="monokai"
                       name={this.props.name}
                       onChange={this.props.onChange}
                       value={this.props.data}
                       fontSize={18}
                       editorProps={{$blockScrolling: true}}
                     />
                </div>
            </div>
    }
}
