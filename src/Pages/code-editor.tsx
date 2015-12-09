import * as React from 'react';

const AceEditor  = require('react-ace');
const Button = require('antd/lib/button');
const Icon = require('antd/lib/icon');
const ButtonGroup = Button.Group;

const ipcRenderer = require('electron').ipcRenderer;

interface _CodeEditorProps {
    name : string;
    title : string;
    onChange : (string) => any
}

export class CodeEditor extends React.Component<_CodeEditorProps, any> {
    constructor(props: _CodeEditorProps) {
        super(props)
    }
    onOpenFile() {
        // console.log(dialog.showOpenDialog({ properties: [ 'openFile' ]}));
    }
    onSaveFile() {
        // console.log(dialog.showSaveDialog());
    }

    render() {
        return <div>
                <div className='code-page-header'>
                    <h2>{this.props.title} &nbsp;&nbsp;
                        <ButtonGroup>
                          <Button type="primary"><Icon type="folder-open" />打开</Button>
                          <Button><Icon type="save" />另存为</Button>
                        </ButtonGroup>
                    </h2>
                </div>
                <div className="code-page-edit">
                    <AceEditor
                       width="100%"
                       height="100vh"
                       mode="c_cpp"
                       theme="monokai"
                       onChange={this.props.onChange}
                       name={this.props.name}
                       fontSize={18}
                       editorProps={{$blockScrolling: true}}
                     />
                </div>
            </div>
    }
}
