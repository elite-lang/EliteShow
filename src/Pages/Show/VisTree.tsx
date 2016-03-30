"use strict";
import * as React from 'react';
const vis = require('vis');
var uuid = require('uuid');

export class VisTree extends React.Component<any, any> {

    constructor(props) {
        super(props)
        this.changeMode = this.changeMode.bind(this)
        this.updateGraph = this.updateGraph.bind(this)
        this.state = {
          hierarchical:true
        };
    }

    render() {
        return <div onDoubleClick={this.changeMode} id={this.props.identifier} style={this.props.style} >
        </div>
    }

    public ShowAST(file_path: string) {
        // 读入文件
    }

    private static data = {
      nodes: new vis.DataSet([
        {id: 1, label: 'Node 1'},
        {id: 2, label: 'Node 2'},
        {id: 3, label: 'Node 3'},
        {id: 4, label: 'Node 4'},
        {id: 5, label: 'Node 5'},
      ]),
      edges: new vis.DataSet([
          {from: 1, to: 2},
          {from: 1, to: 3},
          {from: 2, to: 4},
          {from: 2, to: 5}
      ])
    };

    private static defaultProps = {
          graph: VisTree.data,
          identifier: uuid.v4(),
          style: {width:"100%",height:"600px"}
    };

    changeMode(event) {
      this.setState({hierarchical: !this.state.hierarchical});
      this.updateGraph();
    }

    componentDidMount(){
      this.updateGraph();
    }
    componentDidUpdate(){
      this.updateGraph();
    }

    updateGraph(){
      // Container
      var container = document.getElementById(this.props.identifier);

      // Options
      var options = {
        edges: {
          color: '#000000',
          arrows: { to: true },
          shadow: true
        },
        layout: {
            hierarchical: {}
        }

      };
      if (this.state.hierarchical) {
        options.layout.hierarchical = {
          enabled: true,
          levelSeparation:100,
          sortMethod: "directed"
        };
      } else {
        options.layout.hierarchical = {
          enabled: false
        };
      }
      console.log(container, this.props.graph, options);
      var network = new vis.Network(container, this.props.graph, options);
    }


}
