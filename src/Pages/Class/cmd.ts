"use strict";

var exec = require('child_process').exec;

export class Cmd {
    private src_path: string;
    private file_path: string;

    constructor(src_path:string, file_path:string) {
        this.src_path = src_path;
        this.file_path = file_path;
        this.build = this.build.bind(this)
        this.run = this.run.bind(this)
    }

    build() {
        var cmd = 'elite -i ' + this.src_path + ' --show'
        this.run_cmd(cmd)
    }
    run() {
        this.run_cmd(this.file_path)
    }
    run_cmd(shell) {
        exec(shell, (error, stdout, stderr)=>{
            console.log(stdout);
            if (error != 0) console.log(stderr);
        })
    }

}
