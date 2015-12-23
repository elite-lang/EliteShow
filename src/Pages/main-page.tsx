"use strict";
import * as React from 'react';
var ReactDOM = require('react-dom');
const Datepicker = require('antd/lib/datepicker');
const Row = require('antd/lib/row');
const Col = require('antd/lib/col');
const QueueAnim = require('antd/lib/queue-anim');
const Modal = require('antd/lib/modal');
const confirm = Modal.confirm;
// var message = require('antd/lib/message');
import { MainMenu } from './main-menu'; // 导入别的文件
import { ConfigPage } from './config-page';
import { CodePage } from './code-page';
import { ShowPage } from './show-page';
import { SettingPage } from "./setting-page";
import { AboutPage } from "./about-page";

import { AppData, App } from "./Class/app";

class MainPage extends React.Component<any, AppData> {
    private app: App;
    constructor(props:any) {
        super(props)
        this.onDataChange  = this.onDataChange.bind(this)
        this.onMenuChange  = this.onMenuChange.bind(this)
        this.confirmExit   = this.confirmExit.bind(this)
        this.renderNowPage = this.renderNowPage.bind(this)
        this.app = new App(this.onDataChange)
        this.state = this.app as AppData
        this.app.loadAll()
        window.onbeforeunload = this.confirmExit
    }

    onDataChange() {
        this.setState(this.app as AppData)
    }
    onMenuChange(e: string) {
        this.setState({nowPage: +e} as AppData) // 神奇的string转number的写法
    }
    confirmExit(){
        this.app.saveAll()
        confirm({
            title: '确认退出',
            content: '您确定要退出程序吗？',
            onOk: function() {
                window.onbeforeunload = null //不加这句会引起循环
                window.close()
            },
            onCancel: function() {}
        });
        return false;
    }
    renderNowPage() {
        switch (this.state.nowPage)
        {
            case 1: return <ConfigPage data={this.app} key="page1" />;
            case 2: return <CodePage key="page2" />;
            case 3: return <ShowPage key="page3" />;
            case 4: return <SettingPage key="page4" />;
            case 5: return <AboutPage key="page5" />;
        }
    }

    render() {
        return (
            <div className="container">
                <Row>
                    <Col span='4' className='container-left'>
                        <MainMenu onUpdate={this.onMenuChange} />
                    </Col>
                    <Col span='20'>
                        <QueueAnim
                            type     = {['bottom', 'top']}
                            delay    = {[400, 0]}
                            duration = {300} >
                            {this.renderNowPage()}
                        </QueueAnim>
                    </Col>
                </Row>
            </div>
        )
    }
}


window.onload = function() {
    ReactDOM.render(
        <MainPage />,
        document.getElementById('main_page')
    )
}
