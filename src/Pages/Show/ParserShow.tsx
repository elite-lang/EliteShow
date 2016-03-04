"use strict";
import * as React from 'react';
const Row = require('antd/lib/row');
const Col = require('antd/lib/col');
import { LexDfa } from '../Show/LexDfa';
import { ShowList } from '../Show/ShowList';
import { VisTree } from '../Show/VisTree';
import {App} from '../Class/app';
import {BnfList} from '../Class/bnfList';
import {Core, line} from '../Class/Model';
const Button = require('antd/lib/button');
const Icon = require('antd/lib/icon');
const ButtonGroup = Button.Group;

export class ParserShow extends React.Component<any, any> {
    private data: App;
    private bnf_list: BnfList;
    private list: line[];

    constructor(props) {
        super(props)
        this.data = this.props.data
        this.bnf_list = this.data.loader.bnf_list
        this.list = this.data.loader.core.list
        this.state = {num: 0, onPlay: false, slist: [], stack: [], nodestack: []}
        this.render_line = this.render_line.bind(this)
    }

    update(new_num): void {
        var s = new_num - 1 < 0 ? [] : this.list[ new_num - 1].stack
        var ns = new_num - 1 < 0 ? [] : this.list[ new_num - 1].nodestack
        this.setState({state: this.list[this.state.num].state})
        this.setState({num: new_num, slist: this.render_line(new_num), stack: s, nodestack: ns})
    }

    backward(): void {
        var new_num = this.state.num - 1 < 0 ? 0 : this.state.num - 1
        this.update(new_num)
    }

    forward(): void {
        var new_num = this.state.num + 1 > this.list.length ? this.list.length : this.state.num + 1
        this.update(new_num)
    }

    play(): void {
        this.setState({onPlay: true})
    }

    pause(): void {
        this.setState({onPlay: false})
    }

    rollback(): void {
        this.setState({num: 0, onPlay: false, slist: [], stack: [], nodestack: [], state: undefined})
    }

    render_line(num: number) {
        var vmap = this.data.loader.vmap
        var goto = this.data.loader.goto_map
        var bnf = this.data.loader.bnf_list
        var l = []
        for (var i=0; i<num; i++) {
            var state = this.list[i].state
            var next = this.list[i].next
            var action = this.list[i].action
            var str = 'state: ' + state + '    '
            if (action == 97)
                str += 'accept'
            else if (action == 114)
                str += 'reduce'
            else if (action == 115)
                str += 'shift   ' + vmap.find(next) + '  (' + next + ')'
            l.push(<div>
                <p>{str}</p>
            </div>)
        }
        return l
    }

    showStack(stack: number[]) {
        var s = []
        for (var i of stack) {
            s.push(i+ ' ')
        }
        return s
    }
    showNodeStack(stack: number[]) {
        var vmap = this.data.loader.vmap
        var s = []
        for (var i of stack) {
            s.push(vmap.find(i)+ ' ')
        }
        return s
    }

    render() {
        if (this.state.num < this.list.length) {
            var next = this.list[this.state.num].next
            var str = this.data.loader.vmap.find(next) + '  ' + next
        } else
            var str = ''
        var mainBtn;
        if (!this.state.onPlay) {
            mainBtn = <Button type="primary" onClick={this.play.bind(this)}>
              <Icon type="caret-circle-right" />
            </Button>
        } else {
            mainBtn = <Button type="primary" onClick={this.pause.bind(this)}>
              <Icon type="pause-circle" />
            </Button>
        }

        return <Row>
            <Col span="18"><LexDfa url={this.data.svgfile} show={this.state.state} /></Col>
            <Col span="6" style={{padding: '10px 15px'}}>
                <h3>BNF列表</h3>
                <ShowList data={this.bnf_list.render()} />
                <br/><hr/><br/>
                <h3>下一个Token：</h3>
                <h1>{str}</h1>
                <br/><hr/><br/>
                <h3>状态栈</h3>
                <h2>{ this.showStack(this.state.stack) }</h2>
                <h2>{ this.showNodeStack(this.state.nodestack) }</h2>
                <br/><hr/><br/>
                <ButtonGroup size="large">
                  <Button type="primary" onClick={this.backward.bind(this)}>
                    <Icon type="step-backward" />
                  </Button>
                  {mainBtn}
                  <Button type="primary" onClick={this.forward.bind(this)}>
                    <Icon type="step-forward" />
                  </Button>
                  <Button>
                    <Icon type="rollback" onClick={this.rollback.bind(this)} />
                  </Button>
                </ButtonGroup>
                <ShowList data={this.state.slist}/>
            </Col>
        </Row>
    }

}
