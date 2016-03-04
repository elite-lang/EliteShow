"use strict";

export class Core {
    public list: line[] = [];

    public loadJson(json: any) {
        console.log(json)
        for (var item in json) {
            var l = new line()
            l.state  = json[item].state
            l.next   = json[item].next
            l.action = json[item].action
            l.stack  = json[item].stack
            this.list.push(l)
        }
        return this
    }
}

export class line {
    public state: number;
    public next: number;
    public action: number;
    public stack: number[];
}
