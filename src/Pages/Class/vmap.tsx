"use strict";
import * as React from 'react';
const Table = require('antd/lib/table');


export class Vmap {
    private ConstMap = {};
    private VnMap = {};
    private VtMap = {};
    private RMap = {};
    private sum_size;

    addMap(map, json) {
        for (var item of json) {
            map[item.key] = item.value
            this.RMap[item.value] = item.key
        }
        this.RMap[0] = '$'
    }

    loadJson(json: any) {
        console.log(json)
        this.addMap(this.VnMap, json.VnMap)
        this.addMap(this.VtMap, json.VtMap)
        this.addMap(this.ConstMap, json.ConstMap)
        this.sum_size = json.value0
        return this
    }

    public find(num: number) {
        return this.RMap[num];
    }

    private static vt_cols = [
        {title: 'Vt映射表', width:30, dataIndex:'value'},
        {title: '值', width:30, dataIndex:'key'}
    ]
    private static const_cols = [
        {title: 'Vt映射表', width:30, dataIndex:'value'},
        {title: '值', width:30, dataIndex:'key'}
    ]
    private static vn_cols = [
        {title: 'Vt映射表', width:30, dataIndex:'value'},
        {title: '值', width:30, dataIndex:'key'}
    ]

    gen_data(data) {
        var ans = []
        for (var i in data)
            ans.push({key:data[i],value:i})
        return ans
    }

    render() {
        return <div>
            <Table columns={Vmap.vt_cols} dataSource={this.gen_data(this.VtMap)} bordered pagination={false} />
            <Table columns={Vmap.const_cols} dataSource={this.gen_data(this.ConstMap)} bordered pagination={false} />
            <Table columns={Vmap.vn_cols} dataSource={this.gen_data(this.VnMap)} bordered pagination={false} />
        </div>
    }
}
