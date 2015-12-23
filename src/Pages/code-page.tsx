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

interface _CodePageState {
    code_data : string;
}

export class CodePage extends React.Component<any, _CodePageState> {
    constructor() {
        super()
        this.setCodeData = this.setCodeData.bind(this)
        this.onOpenFile = this.onOpenFile.bind(this)
        this.state = {code_data: ''} as _CodePageState
    }
    setCodeData(e: string) {
        this.setState({code_data: e} as _CodePageState)
    }

    onChange(newValue) {
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
                    that.setCodeData(data)
                }
            });
        });
    }

    onSaveFile() {
        console.log(this.state.code_data)
    }

    render() {
        return <div className="page-container">
                <div className='code-page-header'>
                    <h2>代码 coding &nbsp;&nbsp;
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
                       value={this.state.code_data}
                       name="UNIQUE_ID_OF_DIV"
                       fontSize={18}
                       editorProps={{$blockScrolling: true}}
                     />
                </div>
            </div>
    }
}
