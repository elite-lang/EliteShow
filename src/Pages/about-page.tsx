import * as React from 'react';
const Row = require('antd/lib/row');
const Col = require('antd/lib/col');
const Icon = require('antd/lib/icon');

export class AboutPage extends React.Component<any, any> {
    render() {
        return <Row type="flex" justify="center" align="middle" className='about-container-all' >
                <Col>
                    <h1>Elite Show v1.0</h1>
                    <h3>获取源码 : <Icon type="github" /> <a href="https://github.com/sunxfancy/EliteShow">EliteShow on Github</a></h3>
                    <h3>官方网站 : <Icon type="home" /> <a href="https://github.com/sunxfancy/EliteShow">EliteShow on Github</a></h3>
                    <h3>由 <a href='http://sunxfancy.github.io/'>西风逍遥游</a> 提供</h3>
                </Col>
            </Row>
    }
}
