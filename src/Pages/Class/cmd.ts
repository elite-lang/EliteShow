"use strict";

var cp = require('child_process')
console.log("cp", cp)

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

    build(callback: () => any) {
        var cmd = ['elite', '-i', this.src_path, '-d', this.build_path,
                    '-l', this.lex_path, '-p', this.parser_path, '--show']
        this.svgfile_lex = this.dot(this.gvfile_lex, null)
        this.svgfile_parser = this.dot(this.gvfile_parser, null)
        this.run_cmd(cmd, callback)
    }
    run(callback: () => any) {
        this.run_cmd([this.file_path], callback)
    }

    dot(gvfile, callback: () => any) {
        var cmd = ['dot', '-Tsvg', gvfile, '-o', gvfile + '.svg']
        this.run_cmd(cmd, callback)
        return gvfile + '.svg'
    }

    run_cmd(shell, callback: () => any) {
        cp.exec(this.join(shell),
            (error, stdout, stderr) => {
                console.log(stdout);
                if (error != 0) {
                    console.log(error);
                    console.log(stderr);
                }
                if (callback != null)
                    callback()
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
