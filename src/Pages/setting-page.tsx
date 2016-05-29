"use strict";
import * as React from 'react';
const Slider = require('antd/lib/slider')
const InputNumber = require('antd/lib/input-number')
const Row = require('antd/lib/row')
const Col = require('antd/lib/col')
const Form = require('antd/lib/form')
const Input = require('antd/lib/input')
const Select = require('antd/lib/select')
const Option = Select.Option;

import {App} from "./Class/app";
// import { Slider, InputNumber, Row, Col, Form } from 'antd';

export class SettingPage extends React.Component<any, any> {
    private data: App;

    constructor(props) {
        super(props)
        this.data = props.data;
        this.state = {inputValue: this.data.settings.editor_font_size}
        this.onChange = this.onChange.bind(this)
        this.handleSelectChange = this.handleSelectChange.bind(this)
    }

    onChange(value) {
        this.setState({
          inputValue: value
        });
        this.data.settings.editor_font_size = value
    }

    handleSelectChange(value) {
        console.log(`selected ${value}`);
        this.data.settings.editor_style = value
    }

    render() {
        return <div className="page-container">
                    <h1>设置</h1>
                    <Row style={{ paddingLeft: '30px', fontSize: '20' }}>
                        <Form.Item label="编辑器字体大小">
                        <Row >
                           <Col span="12" >
                             <Slider min={1} max={40} onChange={this.onChange} value={this.state.inputValue} />
                           </Col>
                           <Col span="4">
                             <InputNumber min={1} max={40} style={{ paddingLeft: '16px' }}
                               value={this.state.inputValue} onChange={this.onChange} />
                           </Col>
                         </Row>
                        </Form.Item>
                        <Form.Item label="编辑器字体">
                            <Input placeholder="微软雅黑" style={{ width: 200 }}  />
                        </Form.Item>
                        <Form.Item label="编辑器风格">
                            <Select id="select" size="large"
                                defaultValue={this.data.settings.editor_style}
                                style={{ width: 200 }}
                                onChange={this.handleSelectChange}>
                                <Option value="monokai">monokai</Option>
                                <Option value="github">github</Option>
                                <Option value="tomorrow">tomorrow</Option>
                                <Option value="kuroir">kuroir</Option>
                                <Option value="twilight">twilight</Option>
                                <Option value="xcode">xcode</Option>
                                <Option value="textmate">textmate</Option>
                                <Option value="solarized dark">solarized dark</Option>
                                <Option value="solarized light">solarized light</Option>
                                <Option value="terminal">terminal</Option>
                            </Select>
                        </Form.Item>
                    </Row>
            </div>
    }
}
