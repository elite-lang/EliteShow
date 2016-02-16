"use strict";
const remote = require('remote');
const app = remote.require('app');
const fs = require("fs");
const path = require('path');
import {Cmd} from './cmd'
import {JsonLoader} from './jsonLoader';

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
    private parser_cfg_path : string;
    private lex_cfg_path : string;
    private src_path : string;
    private exe_path : string;
    private build_path : string;
    private json_path : string;
    private update : ()=>any;
    cmd_runner: Cmd;
    loader: JsonLoader;
    gvfile: string;
    svgfile: string;

    constructor(update: ()=>any) {
        this.update = update
        this.nowPage    = 1
        this.code_data  = ''
        this.lex_cfg    = ''
        this.parser_cfg = ''
        this.app_path        = path.join(app.getPath('userData'), 'workspace')
        this.parser_cfg_path = path.join(this.app_path, 'p.cfg')
        this.lex_cfg_path    = path.join(this.app_path, 'l.cfg')
        this.src_path        = path.join(this.app_path, 'main.elite')
        this.exe_path        = path.join(this.app_path, 'build', 'main')
        this.build_path      = path.join(this.app_path, 'build')
        this.json_path       = path.join(this.app_path, 'build', 'parser.json')
        this.gvfile          = path.join(this.app_path, 'build', 'parser.gv')
        this.svgfile         = path.join(this.app_path, 'build', 'parser.svg')
        this.cmd_runner = new Cmd(this.build_path, this.src_path, this.exe_path,
                                  this.lex_cfg_path, this.parser_cfg_path, this.gvfile, this.svgfile);
        this.loadAll = this.loadAll.bind(this)
        this.saveAll = this.saveAll.bind(this)
        console.log(this.app_path)
    }

    public UpdataData(obj) {
        for (var index in obj) { // 用in是对key遍历
            this[index] = obj[index]
        }
        this.update();
    }

    public loadAll() {
        fs.exists(this.app_path, (exists) => {
            if (!exists) fs.mkdir(this.app_path)
        });

        var that = this
        fs.readFile(this.parser_cfg_path, 'utf-8', (err,data) => {
            if(err) return console.log(err)
            that.parser_cfg = data
        });
        fs.readFile(this.lex_cfg_path, 'utf-8', (err,data) => {
            if(err) return console.log(err)
            that.lex_cfg = data
        });
        fs.readFile(this.src_path, 'utf-8', (err,data) => {
            if(err) return console.log(err)
            that.code_data = data
        });

        this.loader = new JsonLoader(this.json_path);
        this.loader.loadAll();

    }
    public saveAll() {
        console.log(this.lex_cfg)
        console.log(this.parser_cfg)
        console.log(this.code_data)

        fs.writeFile(this.parser_cfg_path, this.parser_cfg, 'utf-8', (err) => {
            if (err) return console.log(err)
            console.log(this.lex_cfg_path);
        });
        fs.writeFile(this.lex_cfg_path, this.lex_cfg, 'utf-8', (err) => {
            if (err) return console.log(err)
            console.log(this.lex_cfg_path);
        });
        fs.writeFile(this.src_path, this.code_data, 'utf-8', (err) => {
            if (err) return console.log(err)
            console.log(this.lex_cfg_path);
        });
    }
}
