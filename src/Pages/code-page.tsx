import * as React from 'react';
var brace  = require('brace');
var AceEditor  = require('react-ace');
require('brace/mode/c_cpp')
require('brace/theme/monokai')
const Button = require('antd/lib/button');
const Icon = require('antd/lib/icon');
const ButtonGroup = Button.Group;




export class CodePage extends React.Component<any, any> {
    onChange(newValue) {
        console.log('change',newValue)
    }
    render() {
        return <div>
                <div className='code-page-header'>
                    <h2>代码 coding
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
                       onChange={this.onChange}
                       name="UNIQUE_ID_OF_DIV"
                       fontSize={18}
                       editorProps={{$blockScrolling: true}}
                     />
                </div>
            </div>
    }
}
