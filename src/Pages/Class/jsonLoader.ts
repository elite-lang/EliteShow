"use strict";
const fs = require("fs");

import {GotoMap} from './gotoMap'
import {BnfList} from './bnfList'
import {Vmap} from './vmap'

export class JsonLoader {
    private goto_map: GotoMap;
    private bnf_list: BnfList;
    private vmap: Vmap;
    private path: string;

    constructor(path: string) {
        this.path = path;
    }

    loadAll() : void {
        var json_data = this.loadJson(this.path)
        this.bnf_list = new BnfList().loadJson(json_data.bnf)
        this.goto_map = new GotoMap().loadJson(json_data.table)
        this.vmap     = new Vmap().loadJson(json_data.vmap)
    }

    loadJson(path: string) {
        var data = fs.readFileSync(path, 'utf8')
        var ans = null;
        try{
            ans = JSON.parse(data)
        } catch(e) {
            console.log(e)
        }
        return ans;
    }

}
