import * as React from 'react';
const Row = require('antd/lib/row');
const Col = require('antd/lib/col');

export class AboutPage extends React.Component<any, any> {
    render() {
        return <Row type="flex" justify="center" align="middle" >
                <Col className='about-container-all'>
                    <h1>Elite Show v1.0</h1>
                    <h2>由 西风逍遥游 提供</h2>
                </Col>
            </Row>
    }
}
