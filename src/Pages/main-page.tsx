
var React = require('react');
var ReactDOM = require('react-dom');

import 'antd/lib/index.css';
var Datepicker = require('antd/lib/datepicker');
var message = require('antd/lib/message');

const App = React.createClass({
  getInitialState() {
    return {
      date: ''
    };
  },
  handleChange(value) {
    message.info('您选择的日期是: ' + value.toString());
    this.setState({
      date: value
    });
  },
  render() {
    return <div style={{width: 400, margin: '100px auto'}}>
      <Datepicker onSelect={this.handleChange} />
      <div style={{marginTop: 20}}>当前日期：{this.state.date.toString()}</div>
    </div>;
  }
});

export default App;

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
