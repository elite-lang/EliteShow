"use strict";

export class BnfList {
    private data: Array<any>;

    loadJson(json: any) {
        this.data = []
        for (var key in json)  {
            this.data.push( json[key] )
        }
        return this
    }
}
