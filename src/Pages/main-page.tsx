"use strict";
import * as React from 'react';
var ReactDOM = require('react-dom');
var Datepicker = require('antd/lib/datepicker');
var Row = require('antd/lib/row');
var Col = require('antd/lib/col');
var QueueAnim = require('antd/lib/queue-anim');
// var message = require('antd/lib/message');
import { MainMenu } from './main-menu'; // 导入别的文件
import { ConfigPage } from './config-page';
import { CodePage } from './code-page';
import { ShowPage } from './show-page';
import { SettingPage } from './setting-page';
import { AboutPage } from './about-page';


interface _MainPageState {
    nowPage: number;
}

class MainPage extends React.Component<any, _MainPageState> {
    private id: string;
    constructor(id: string) {
        super()
        this.id = id
        this.state = {nowPage: 1} as _MainPageState;
        this.onMenuChange = this.onMenuChange.bind(this)
    }
    PageRender() {
        ReactDOM.render(
            <MainPage />,
            document.getElementById(this.id)
        )
    }
    onMenuChange(e: string) {
        this.setState({nowPage: +e}) // 神奇的string转number的写法
    }

    renderNowPage(num: number) {
        switch (num)
        {
            case 1: return <ConfigPage key="page1" />;
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
                      type={['bottom', 'top']}
                      delay={[400, 0]}
                      duration={300} >
                        {this.renderNowPage(this.state.nowPage)}
                        </QueueAnim>
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
