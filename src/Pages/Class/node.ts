"use strict";

export class Node {
    public children : Node[]
    public label : string

    constructor(label) {
        this.label = label
    }

    public add(node) {
        if (this.children == null)
            this.children = new Array<Node>()
        this.children.push(node)
    }
    public join(node) {
        if (this.children == null)
            this.children = new Array<Node>()
        this.children.join(node)
    }


    public static makeNode(data, node, id) {
        data.nodes.push({id: id, label: node.label})
        if (node.children == null) return
        for (var cnode of node.children) {
            var cid = Node.getID()
            data.edges.push({from: id, to: cid})
            Node.makeNode(data, cnode, cid)
        }
    }


    private static now_id: number
    public static beginGraph() { Node.now_id = 1 }
    public static getID() {
        return Node.now_id++
    }

}
