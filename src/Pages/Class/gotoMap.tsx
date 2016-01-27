"use strict";
import * as React from 'react';


export class GotoMap {
    private Action;
    private Goto;
    private state_size;

    loadJson(json: any) {
        this.Action = json.Action
        this.Goto = json.Goto
        this.state_size = json.value0
        return this
    }

    render() {

    }

}
