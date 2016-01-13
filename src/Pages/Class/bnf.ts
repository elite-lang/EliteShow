"use strict";
const fs = require("fs");

export class Bnf {
    private json_data;
    constructor(json_path: string) {
        this.json_data = this.loadJson(json_path)
        this.parseJson = this.parseJson.bind(this)
    }

    loadJson(path: string) {
        var data = fs.readFileSync(path, 'utf8')
        console.log('data', data)
        var ans = null;
        try{
            ans = JSON.parse(data)
        } catch(e) {
            console.log(e)
        }
        return ans;
    }

    parseJson() {
        console.log(this.json_data)
    }

}
