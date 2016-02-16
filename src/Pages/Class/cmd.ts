"use strict";

var cp = require('child_process')
console.log("cp", cp)

export class Cmd {
    private build_path : string;
    private src_path   : string;
    private file_path  : string;
    private lex_path   : string;
    private parser_path: string;
    private gvfile     : string;
    private svgfile    : string;

    constructor(build_path:string, src_path:string, file_path:string,
                lex_path:string, parser_path:string, gvfile:string, svgfile:string) {
        this.build_path  = build_path;
        this.src_path    = src_path;
        this.file_path   = file_path;
        this.lex_path    = lex_path;
        this.parser_path = parser_path;
        this.gvfile      = gvfile;
        this.svgfile     = svgfile;
        this.build = this.build.bind(this)
        this.run   = this.run.bind(this)
    }

    build(callback: () => any) {
        var cmd = ['elite', '-i', this.src_path, '-d', this.build_path,
                    '-l', this.lex_path, '-p', this.parser_path, '--show']
        this.dot(null)
        this.run_cmd(cmd, callback)
    }
    run(callback: () => any) {
        this.run_cmd([this.file_path], callback)
    }

    dot(callback: () => any) {
        var cmd = ['dot', '-Tsvg', this.gvfile, '-o', this.svgfile]
        this.run_cmd(cmd, callback)
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
