"use strict";
const fs = require("fs");

export class LexModel {
    private path: string;

    constructor(path: string) {
        this.path = path;
    }
    private names = {}
    private lines

    getNames() {
        return this.names
    }

    loadAll() {
        var json = this.loadJson().lex
        console.log(json)
        for (var i in json.rnames) {
            this.names[json.rnames[i]] = json.regexs[i];
        }
        this.lines = json.lines
    }

    loadJson() {
        try{
            var data = fs.readFileSync(this.path, 'utf8')
            var ans = JSON.parse(data)
        } catch(e) {
            console.log(e)
        }
        return ans;
    }
}
