"use strict";
import * as React from 'react';

export class Bnf {
    private source: string;
    private gen: string[];

    constructor(json) {
        this.source = '<' + json.value2.value1 + '>'
        this.gen = []
        for (let i = 3; json['value'+i] != undefined; i++)
            for (let j = 0; j < 3; j++)
                if (json['value'+i]['value'+j].length != 0) {
                    if (j === 0)
                        this.gen.push('"' + json['value'+i]['value'+j] + '"')
                    if (j === 1)
                        this.gen.push('<' + json['value'+i]['value'+j] + '>')
                    if (j === 2)
                        this.gen.push('[' + json['value'+i]['value'+j] + ']')
                    break;
                }
    }

    genlist(list: string[]) {
        var s = []
        for (var key in list) {
            var className;
            if (list[key][0] == '<') className = 'c1';
            if (list[key][0] == '"') className = 'c0';
            if (list[key][0] == '[') className = 'c2';
            s.push(
                <i key={key} className={className}> {list[key]} </i>
            );
        }
        return s
    }

    render(key) {
        return <div key={key} className='bnf-list'>
            <p>
                <i className='c1'>{this.source}</i>
                <i> => </i>
                {this.genlist(this.gen)}
            </p>
        </div>
    }
}

export class BnfList {
    private data: Bnf[];

    loadJson(json: any) {
        console.log(json)
        this.data = []
        for (var key in json)  {
            this.data.push( new Bnf(json[key]) )
        }
        return this
    }

    find(index: number) {
        return this.data[index]
    }

    render_all(list: Bnf[]) {
        var ans = []
        for (var key in list)
            ans.push(list[key].render(key))
        return ans
    }

    render() {
        return <div>
            {this.render_all(this.data)}
        </div>
    }
}
