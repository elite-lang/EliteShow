"use strict";
import * as React from 'react';

export class Bnf {
    private source: string;
    private gen: string[];

    constructor(json) {
        this.source = json.value2
        this.gen = []
        for (let i = 3; json['value'+i] != undefined; i++) {
            this.gen.push(json['value'+i])
        }
        console.log(this)
    }

    genlist(list: string[]) {
        var s = ''
        for (var key in list) {
            s += (list[key] + ' ')
        }
        return s
    }

    render(key) {
        return <div key={key}>
            <p>{this.source + ' => ' + this.genlist(this.gen)}</p>
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
