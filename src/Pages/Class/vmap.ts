"use strict";


export class Vmap {
    private ConstMap;
    private VnMap;
    private VtMap;
    private sum_size;

    loadJson(json: any) {
        this.ConstMap = json.ConstMap
        this.VnMap = json.VnMap
        this.VtMap = json.VtMap
        this.sum_size = json.value0
        return this
    }
}
