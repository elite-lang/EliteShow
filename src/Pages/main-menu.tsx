import * as React from 'react';
var Animate = require('rc-animate');
var Menu = require('antd/lib/menu');
var Icon = require('antd/lib/icon');
const Item = Menu.Item;

interface _MenuProps {
    onUpdate : (string) => any
}

interface _MenuState { // 用接口会比较方便
    current : string
}

// 这里必须要导出类
export class MainMenu extends React.Component<_MenuProps, _MenuState> {
    private current : string;
    private prop : _MenuProps

    constructor(props: _MenuProps) {
        super(props)
        this.prop = props
        this.state = this.getInitial()
        this.handleClick = this.handleClick.bind(this)
        // 这句非常关键，原因：
        // React components using ES6 classes no longer autobind this to non React methods.
    }

    getInitial(): _MenuState {
        return {current: '1'} as _MenuState;
    }
    handleClick(e) {
        this.setState({current: e.key} as _MenuState);
        this.prop.onUpdate(e.key)
    }
    render() {
        return <Menu onClick={this.handleClick}
                     selectedKeys={[this.state.current]}
                     theme='dark'
                     mode="inline">
            <Item key="1"><Icon type="code" />选项1</Item>
            <Item key="2"><Icon type="file-text" />选项2</Item>
            <Item key="3"><Icon type="github" />选项3</Item>
            <Item key="4"><Icon type="setting" />选项4</Item>
        </Menu>;
    }
}
