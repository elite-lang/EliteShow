"use strict";
import * as React from 'react';


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

    render_all(data) {
        var ans = []
        for (var i in data)
            ans.push(<tr key={data[i]}><td>{i}</td><td>{data[i]}</td></tr>)
        return ans
    }

    render() {
        return  <div className='ant-table'>
        <table>
            <thead>
                <tr>
                <th>Vt　映射表</th>
                </tr>
            </thead>
            <tbody>
                {this.render_all(this.VtMap)}
            </tbody>
        </table>
        <table>
            <thead>
                <tr>
                <th>常量映射表</th>
                </tr>
            </thead>
            <tbody>
                {this.render_all(this.ConstMap)}
            </tbody>
        </table>
        <table>
            <thead>
                <tr>
                <th>Vn　映射表</th>
                </tr>
            </thead>
            <tbody>
                {this.render_all(this.VnMap)}
            </tbody>
        </table>
        </div>
    }
}
