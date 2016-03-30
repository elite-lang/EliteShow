"use strict";
const fs = require("fs");

import {GotoMap} from './gotoMap'
import {BnfList} from './bnfList'
import {Vmap} from './vmap'
import {Core} from './Model'

export class JsonLoader {
    goto_map: GotoMap;
    bnf_list: BnfList;
    vmap: Vmap;
    core: Core;
    private path: string;

    constructor(path: string) {
        this.path = path;
    }

    loadAll() : void {
        var json_data = this.loadJson(this.path)
        if (json_data == undefined || json_data == null) return;
        this.bnf_list = new BnfList().loadJson(json_data.bnf)
        this.goto_map = new GotoMap().loadJson(json_data.table)
        this.vmap     = new Vmap().loadJson(json_data.vmap)
        this.core     = new Core().loadJson(json_data.core)
    }

    loadJson(path: string) {
        try{
            var data = fs.readFileSync(path, 'utf8')
            var ans = JSON.parse(data)
        } catch(e) {
            console.log(e)
        }
        return ans;
    }

}
