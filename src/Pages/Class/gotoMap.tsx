"use strict";
import * as React from 'react';
const Table = require('antd/lib/table');

export class GotoMap {
    private Action;
    private Goto;
    private state_size;

    loadJson(json: any) {
        this.Action = json.Action
        this.Goto = json.Goto
        this.state_size = json.value0
        return this
    }

    find(state: number, next: number): number {
        return this.Goto[state][next]
    }

    private getChar(v): string {
        if (v != undefined)
            return String.fromCharCode(v)
        return ''
    }

    render_row(row, i) {
        var ans = {key:0}
        ans.key = i
        for (var j in row)
            ans[j] = this.getChar(this.Action[i][j]) +  (row[j] != -1 ? row[j] : "-")
        return ans
    }

    gen_columns() {
        var col = []
        col.push({title:'标号', dataIndex:'key', key:-1, width:30})
        for (var i in this.Goto)
            col.push({title:i, dataIndex:i, key:i, width:30 })
        return col
    }

    gen_data() {
        var data = []
        for (var i in this.Goto)
            data.push(this.render_row(this.Goto[i], i))
        return data
    }

    render() {
        return <Table columns={this.gen_columns()} dataSource={this.gen_data()} bordered useFixedHeader />
    }

}
