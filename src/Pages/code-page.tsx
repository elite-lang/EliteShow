import * as React from 'react';
var brace  = require('brace');
var AceEditor  = require('react-ace');
require('brace/mode/c_cpp')
require('brace/theme/monokai')

export class CodePage extends React.Component<any, any> {
    onChange(newValue) {
        console.log('change',newValue)
    }
    render() {
        return <div>
                <div className='code-page-header'>
                    <h1>代码 coding</h1>
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
