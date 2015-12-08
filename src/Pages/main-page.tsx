
import * as React from 'react';
var ReactDOM = require('react-dom');
var Datepicker = require('antd/lib/datepicker');
var Row = require('antd/lib/row');
var Col = require('antd/lib/col');
// var message = require('antd/lib/message');


class MainPage extends React.Component<string, any> {
    private id: string;
    constructor(id: string) {
        super(id)
        this.id = id
    }
    PageRender() {
        ReactDOM.render(
            this.render(),
            document.getElementById(this.id)
        )
    }
    render() {
        return (
            <div>
                <Row>
                    <h1>Hello World</h1>
                </Row>
                <Row>
                    <Col span='4'>
                        ok...
                    </Col>
                    <Col span='20'>
                        <Datepicker defaultValue="2015-01-01" />
                    </Col>
                </Row>
            </div>
        )
    }
}

window.onload = function() {
    let main = new MainPage('main_page')
    main.PageRender()
}
