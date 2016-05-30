"use strict";
import * as React from 'react';

var brace  = require('brace');
var AceEditor  = require('react-ace');
require('brace/mode/c_cpp')
require('brace/mode/ini')
require('brace/mode/lua')

require('brace/theme/monokai')
require('brace/theme/github')
require('brace/theme/tomorrow')
require('brace/theme/kuroir')
require('brace/theme/twilight')
require('brace/theme/xcode')
require('brace/theme/textmate')
require('brace/theme/solarized_dark')
require('brace/theme/solarized_light')
require('brace/theme/terminal')

const Button = require('antd/lib/button');
const Icon = require('antd/lib/icon');
const ButtonGroup = Button.Group;
const fs = require("fs");
const remote = require('remote');
const dialog = remote.require('dialog');

import {Settings} from "../Class/settings";

interface _CodeEditorProps {
    name : string;
    title : string;
    data : string;
    mode : string;
    settings : Settings;
    onChange : (string) => any;
    onUpdate : (any) => any;
}

export class CodeEditor extends React.Component<_CodeEditorProps, any> {
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
                    console.log("error to load file:"+ fileName)
                }else{
                    this.props.onChange(data)
                    that.props.onUpdate({})
                }
            });
        });
    }
    onSaveFile() {
        var that = this
        dialog.showSaveDialog((fileName) => {
            if (fileName === undefined) return;
            fs.writeFile(fileName, this.props.data, 'utf-8', (err) => {
                if(err){
                    console.log("error to save file:"+ fileName)
                }
            });
        });
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
                        mode={this.props.mode}
                        theme={this.props.settings.editor_style}
                        name={this.props.name}
                        onChange={this.props.onChange}
                        value={this.props.data}
                        fontSize={this.props.settings.editor_font_size}
                        tabSize={4}
                        editorProps={{$blockScrolling: true}}
                        onLoad={(editor) => {
                            editor.getSession().setUseWorker(false);
                        }}
                     />
                </div>
            </div>
    }
}
