
var React = require('react');
var ReactDOM = require('react-dom');

var Datepicker = require('antd/lib/datepicker');
// var message = require('antd/lib/message');


class MainPage {
    id : string
    constructor(id: string) {
        this.id = id;
    }
    render() {
        ReactDOM.render(
            <Datepicker defaultValue="2015-01-01" />,
            document.getElementById(this.id)
        )
    }
}

window.onload = function() {
    let main = new MainPage('main_page')
    main.render()
}
