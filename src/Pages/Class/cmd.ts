"use strict";
var remote = require("remote");
var cp = remote.require('child_process')

export class Cmd {
    private build_path : string;
    private src_path   : string;
    private file_path  : string;
    private lex_path   : string;
    private parser_path: string;
    public  gvfile_lex     : string;
    public  svgfile_lex    : string;
    public  gvfile_parser  : string;
    public  svgfile_parser : string;

    constructor(build_path:string, src_path:string, file_path:string,
                lex_path:string, parser_path:string, gvfile_lex:string, gvfile_parser:string) {
        this.build_path    = build_path;
        this.src_path      = src_path;
        this.file_path     = file_path;
        this.lex_path      = lex_path;
        this.parser_path   = parser_path;
        this.gvfile_lex    = gvfile_lex;
        this.gvfile_parser = gvfile_parser;
        this.build = this.build.bind(this)
        this.run   = this.run.bind(this)
    }

    build(callback: (boolean) => any) {
        var cmd = ['-i', this.src_path, '-d', this.build_path,
                    '-l', this.lex_path, '-p', this.parser_path, '--show']
        this.run_cmd('elite', cmd, (code) => {
            if (!code) return callback(code)
            console.log('elite:'+code)
            var l = this.dot(this.gvfile_lex)
            var p = this.dot(this.gvfile_parser)
            if (l) this.svgfile_lex = l as string
            if (p) this.svgfile_parser = p as string
            if (callback!=null) {
                if (l==false || p==false) return callback(false)
                return callback(code)
            }
        })
    }
    run(callback: (boolean) => any) {
        this.run_cmd(this.file_path, [], callback)
    }

    dot(gvfile) : any {
        var args = ['-Tsvg', gvfile, '-o', gvfile + '.svg']
        var ret = cp.spawnSync('dot', args)
        if (ret.status != 0) return false
        return gvfile + '.svg'
    }
    run_cmd(shell, args, callback: (boolean) => any) {
        var cmd = cp.execFile(shell, args, {env:remote.process.env},
            (error, stdout, stderr) => {
            console.log(stdout);
            if (error != 0) {
                console.log(error);
                console.log(stderr);
            }
            if (callback != null)
                callback(error != 0)
        })
    }
    join(args: string[]) {
        var ans = ''
        for (var i= 0; i<args.length; ++i) {
            ans += args[i]
            ans += ' '
        }
        return ans
    }
}
