var React = require('react');
var ReactDOM = require('react-dom');
require('antd/lib/index.css');
var Datepicker = require('antd/lib/datepicker');
var message = require('antd/lib/message');
var App = React.createClass({
    getInitialState: function () {
        return {
            date: ''
        };
    },
    handleChange: function (value) {
        message.info('您选择的日期是: ' + value.toString());
        this.setState({
            date: value
        });
    },
    render: function () {
        return React.createElement("div", {"style": { width: 400, margin: '100px auto' }}, React.createElement(Datepicker, {"onSelect": this.handleChange}), React.createElement("div", {"style": { marginTop: 20 }}, "当前日期：", this.state.date.toString()));
    }
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = App;
var MainPage = (function () {
    function MainPage(id) {
        this.id = id;
    }
    MainPage.prototype.render = function () {
        ReactDOM.render(React.createElement(Datepicker, {"defaultValue": "2015-01-01"}), document.getElementById(this.id));
    };
    return MainPage;
})();
window.onload = function () {
    var main = new MainPage('main_page');
    main.render();
};
