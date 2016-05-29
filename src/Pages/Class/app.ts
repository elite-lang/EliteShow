"use strict";
const remote = require('remote');
const app = remote.require('app');
const fs = require("fs");
const path = require('path');
import {Cmd} from './cmd'
import {JsonLoader} from './jsonLoader';
import {LexModel} from "./LexModel";
import {Settings} from "./settings";

export interface AppData {
    nowPage    : number;
    code_data  : string;
    lex_cfg    : string;
    parser_cfg : string;
}


export class App implements AppData {

    nowPage    : number;
    code_data  : string; // 要读入的代码文本元数据
    lex_cfg    : string; // lex配置元数据
    parser_cfg : string; // parser配置元数据

    settings : Settings; // 配置信息
    setting_path: string;

    private app_path : string;
    private parser_cfg_path : string;
    private lex_cfg_path : string;
    private src_path : string;
    private exe_path : string;
    private build_path : string;
    private json_path : string;
    private lex_path : string;
    private update : ()=>any;
    cmd_runner: Cmd;
    loader: JsonLoader;
    lex_loader: LexModel;
    llvmIRdata: string;

    constructor(update: ()=>any) {
        this.update = update
        this.nowPage    = 1
        this.code_data  = ''
        this.lex_cfg    = ''
        this.parser_cfg = ''
        this.setting_path    = path.join(app.getPath('userData'), 'settings.json')
        this.app_path        = path.join(app.getPath('userData'), 'workspace')
        this.parser_cfg_path = path.join(this.app_path, 'p.cfg')
        this.lex_cfg_path    = path.join(this.app_path, 'l.cfg')
        this.src_path        = path.join(this.app_path, 'main.elite')
        this.exe_path        = path.join(this.app_path, 'build', 'main')
        this.build_path      = path.join(this.app_path, 'build')
        this.json_path       = path.join(this.app_path, 'build', 'parser.json')
        this.lex_path        = path.join(this.app_path, 'build', 'lex.json')
        var gvfile_lex       = path.join(this.app_path, 'build', 'lex.gv')
        var gvfile_parser    = path.join(this.app_path, 'build', 'parser.gv')
        this.cmd_runner = new Cmd(this.build_path, this.src_path, this.exe_path,
                                  this.lex_cfg_path, this.parser_cfg_path, gvfile_lex, gvfile_parser);
        this.loadAll = this.loadAll.bind(this)
        this.saveAll = this.saveAll.bind(this)
        console.log(this.app_path)
        this.loadSettings()
    }

    loadSettings() {
        fs.exists(this.setting_path, (exists) => {
            if (!exists) {
                this.settings = {editor_font_size : 18, editor_style : "monokai"} as Settings
                fs.writeFile(this.setting_path, JSON.stringify(this.settings), 'utf-8', (err) => {
                    if (err) return console.log(err)
                    console.log(this.setting_path);
                });
            } else {
                this.settings = JSON.parse(fs.readFileSync(this.setting_path, 'utf-8'))
            }
        });
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

    }

    public loadJson() {
        this.loader = new JsonLoader(this.json_path);
        this.lex_loader = new LexModel(this.lex_path);
        this.loader.loadAll();
        this.lex_loader.loadAll();
        fs.readFile(path.join(this.app_path, 'build', 'main.bc.bitcode'), 'utf-8', (err,data) => {
            if(err) return
            this.llvmIRdata = data
        });

        return this.loader;
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
