"use strict";
const fs = require("fs");

import {GotoMap} from './gotoMap';
import {BnfList} from './bnfList';


export class JsonLoader {
    private goto_map: GotoMap;
    private bnf_list: BnfList;
    private path: string;

    constructor(path: string) {
        this.path = path;
    }

    loadAll() : void {
        var json_data = this.loadJson(this.path)
        console.log(json_data)
        this.bnf_list = new BnfList().loadJson(json_data.bnf)
        this.goto_map = new GotoMap().loadJson(json_data.table)
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

}
