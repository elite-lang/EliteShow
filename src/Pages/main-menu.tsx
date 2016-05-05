"use strict";
import * as React from 'react';
const Animate = require('rc-animate');
const Menu = require('antd/lib/menu');
const Icon = require('antd/lib/icon');
const Item = Menu.Item;
const Divider = Menu.Divider;
const SubMenu = Menu.SubMenu;
const Dropdown = require('antd/lib/dropdown');
const Button = require('antd/lib/button');
const message = require('antd/lib/message');
const notification = require('antd/lib/notification');
import {App} from './Class/app';


interface _MenuProps {
    onUpdate : (string) => any;
    app: App;
}

interface _MenuState { // 用接口会比较方便
    current : string,
    isCompiling: boolean,
    disableShow: boolean
}

// 这里必须要导出类
export class MainMenu extends React.Component<_MenuProps, _MenuState> {
    private current : string;
    private prop : _MenuProps;
    private app: App;

    constructor(props: _MenuProps) {
        super(props)
        this.prop = props
        this.app = props.app
        this.state = this.getInitial()
        this.handleClick = this.handleClick.bind(this)
        this.handleMainBtn = this.handleMainBtn.bind(this)
        this.onBuild = this.onBuild.bind(this)
        this.onRun = this.onRun.bind(this)
        // 这句非常关键，原因：
        // React components using ES6 classes no longer autobind this to non React methods.
    }

    getInitial(): _MenuState {
        return {current: '1', isCompiling: false, disableShow: true} as _MenuState;
    }
    handleClick(e) {
        if (e.key == '0') {
            return
        }
        if (this.state.disableShow && e.key == '3') {
            message.info('您需要先构建项目');
            return
        }
        this.setState({current: e.key} as _MenuState);
        this.prop.onUpdate(e.key)
    }
    handleMainBtn(e) {
        if (e.key == '6') {
            console.log("on Exit");
            window.close();
        }
    }
    onBuild() {
        this.app.saveAll()
        this.app.cmd_runner.build((code) => {
            if (code) {
                this.setState({current:'3', isCompiling: false, disableShow: false} as _MenuState);
                notification.success({
                    message: '构建成功',
                    description: '项目构建成功于'+this.getDateTime()
                });
                this.prop.onUpdate('3')
            } else
                notification.error({
                    message: '构建失败',
                    description: '项目构建失败于'+this.getDateTime()
                })
        })
        this.setState({isCompiling: true} as _MenuState);
    }
    onRun() {
        var that = this
        this.app.cmd_runner.run(()=>{
            console.log("code run");
        })
    }

    render() {
        return <div className='main-menu-container'>
            <Menu onClick={this.handleClick}
                     selectedKeys={[this.state.current]}
                     theme='dark'
                     mode="inline">
                <Item key="0" className="menu-logo-outer"><div className="menu-logo-middle">
                    <img src="img/elite.png" height="60%" alt="elite-logo" /></div> Elite Show
                </Item>
                <Item key="1"><Icon type="code" />分析器配置</Item>
                <Item key="2"><Icon type="file-text" />源代码编辑</Item>
                <Item key="3"><Icon type="solution" />过程展示</Item>
                <Item key="4"><Icon type="setting" />选项</Item>
                <Item key="5"><Icon type="info-circle" />关于</Item>
                <div className='build-btn-container'>
                    <Button className='main-menu-btn' onClick={this.onBuild} loading={this.state.isCompiling} >
                        <Icon type="caret-circle-right" /> 构建项目
                    </Button>
                    <Button className='main-menu-btn' onClick={this.onRun}>
                        <Icon type="desktop" /> 执行结果
                    </Button>
                </div>
            </Menu>
            <Dropdown overlay={this.mainMenu} >
                <div className='main-menu-btn-container'>
                    <Button type="primary" className='main-menu-btn'>
                        <Icon type="bars" /> 主菜单 &nbsp; <Icon type="up" />
                    </Button>
                </div>
            </Dropdown>
        </div>;
    }

    private mainMenu = <div><Menu onClick={this.handleMainBtn} className='main-popup-menu' mode="vertical">
      <Item key="0">新项目...</Item>
      <Item key="1">打开项目...</Item>
      <Item key="2">保存项目...</Item>
      <SubMenu key="sub1" title={<span><Icon type="export" /><span>导出</span></span>}>
        <Item key="3">选项1</Item>
        <Item key="4">选项2</Item>
        <Item key="5">选项3</Item>
      </SubMenu>
      <Divider/>
      <Item key="6">退出</Item>
    </Menu></div>;

    getDateTime() {
        var date = new Date();
        var hour:any = date.getHours()
        hour = (hour < 10 ? "0" : "") + hour;
        var min:any  = date.getMinutes();
        min = (min < 10 ? "0" : "") + min;
        var sec:any  = date.getSeconds();
        sec = (sec < 10 ? "0" : "") + sec;
        var year:any = date.getFullYear();
        var month:any = date.getMonth() + 1;
        month = (month < 10 ? "0" : "") + month;
        var day:any  = date.getDate();
        day = (day < 10 ? "0" : "") + day;

        return year + "/" + month + "/" + day + "  " + hour + ":" + min + ":" + sec;
    }
}
