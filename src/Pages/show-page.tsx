"use strict";
import * as React from 'react';
const Tabs = require('antd/lib/tabs');
const Icon = require('antd/lib/icon');
const TabPane = Tabs.TabPane;


export class ShowPage extends React.Component<any, any> {
    constructor(props) {
        super(props)
    }

    private tabContent = [
      <span><Icon type="tag-o" />词法分析状态</span>,
      <span><Icon type="tag-o" />语法分析状态</span>,
      <span><Icon type="tag-o" />语法树构建</span>,
      <span><Icon type="tag-o" />生成LLVM-IR</span>,
    ];

    render() {
        return <div className='show-page-ctx'>
                <h1>过程展示</h1>
                <Tabs defaultActiveKey="1">
                    <TabPane tab={this.tabContent[0]} key="1">词法分析状态</TabPane>
                    <TabPane tab={this.tabContent[1]} key="2">语法分析状态</TabPane>
                    <TabPane tab={this.tabContent[2]} key="3">语法树构建</TabPane>
                    <TabPane tab={this.tabContent[3]} key="4">生成LLVM-IR</TabPane>
                </Tabs>
            </div>
    }
}
