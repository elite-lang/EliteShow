"use strict";
import * as React from 'react';


export class GotoMap {
    private Action;
    private Goto;
    private state_size;

    loadJson(json: any) {
        console.log(json)
        this.Action = json.Action
        this.Goto = json.Goto
        this.state_size = json.value0
        return this
    }

    private getChar(v): string {
        if (v != undefined)
            return String.fromCharCode(v)
        return ''
    }

    render_row(row, i) {
        var ans = []
        ans.push(<td key={-1}>{i}</td>)
        for (var j in row)
            ans.push(
                <td key={j}>{this.getChar(this.Action[i][j]) + row[j]}</td>
            );
        return ans
    }

    render_all(Goto) {
        var ans = []
        for (var i in Goto)
            ans.push(<tr key={i}>{this.render_row(Goto[i], i)}</tr>)
        return ans
    }

    render() {
        return <div className='ant-table'>
        <table>
            <thead>
                <tr>
                <th>表头</th>
                </tr>
            </thead>
            <tbody>
                {this.render_all(this.Goto)}
            </tbody>
        </table></div>
    }

}
