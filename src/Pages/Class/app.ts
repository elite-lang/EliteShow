"use strict";
const remote = require('remote');
const app = remote.require('app');
const fs = require("fs");
const path = require('path');

export interface AppData {
    nowPage    : number;
    code_data  : string;
    lex_cfg    : string;
    parser_cfg : string;
}


export class App implements AppData {

    nowPage    : number;
    code_data  : string;
    lex_cfg    : string;
    parser_cfg : string;

    private app_path : string;
    private Updata : () => any
    private parser_cfg_path : string;
    private lex_cfg_path : string;

    constructor(func : () => any) {
        this.nowPage    = 1
        this.code_data  = ''
        this.lex_cfg    = ''
        this.parser_cfg = ''
        this.app_path   = path.join(app.getPath('userData'), 'workspace')
        this.Updata     = func
        this.parser_cfg_path = path.join(this.app_path, 'p.cfg')
        this.lex_cfg_path    = path.join(this.app_path, 'l.cfg')
        this.loadAll = this.loadAll.bind(this)
        this.saveAll = this.saveAll.bind(this)
        console.log(this.app_path)
    }


    public loadAll() {
        fs.exists(this.app_path, (exists) => {
            if (!exists) fs.mkdir(this.app_path)
        });

        var that = this
        fs.readFile(this.parser_cfg_path, 'utf-8', (err,data) => {
            if(err) return console.log(err)
            that.parser_cfg = data
            that.Updata()
        });
        fs.readFile(this.lex_cfg_path, 'utf-8', (err,data) => {
            if(err) return console.log(err)
            that.lex_cfg = data
            that.Updata()
        });

    }
    public saveAll() {
        fs.writeFile(this.parser_cfg_path, this.parser_cfg, 'utf-8', (err) => {
            if (err) return console.log(err)
            console.log(this.lex_cfg_path);
        });
        fs.writeFile(this.lex_cfg_path, this.lex_cfg, 'utf-8', (err) => {
            if (err) return console.log(err)
            console.log(this.lex_cfg_path);
        });
    }
}
