import React, {Component} from 'react';
import Node from './Node/Node';
import {travelingSalesperson} from '../Algorithm/TspAlgo';

import './TspViz.css';

export default class TspViz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes: [],
            clicked: false,
            numPinned: 0,
            startRow: 0,
            startCol: 0,
            pins: [],
        };
    } 

    componentDidMount() {
        const nodes = [];
        const numRows = 75;
        const numCols = 100;
        for (let row=0; row<numRows; row++) {
            const currentRow = [];
            for (let col=0; col<numCols; col++) {
                const currentNode = {
                    col,
                    row,
                    isStart: false,
                    pinned: false,
                    visited: false,
                    idNum: this.state.numPinned-1,
                };
                currentRow.push(currentNode);
            }
            nodes.push(currentRow);
        } 
        this.setState({nodes})
    }

    arraysEqual = (a, b) => {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length !== b.length) return false;
      
        for (var i = 0; i < a.length; ++i) {
          if (a[i] !== b[i]) return false;
        }
        return true;
      }

    clearNodes = () => {
        const nodes = [];
        const numRows = 75;
        const numCols = 100;
        for (let row=0; row<numRows; row++) {
            const currentRow = [];
            for (let col=0; col<numCols; col++) {
                const currentNode = {
                    col,
                    row,
                    isStart: false,
                    pinned: false,
                    visited: false,
                    idNum: this.state.numPinned-1,
                };
                currentRow.push(currentNode);
            }
            nodes.push(currentRow);
        }
        this.setState({
            nodes: nodes,
            clicked: false,
            numPinned: 0,
            startRow: 0,
            startCol: 0,
            pins: [],
        })
    }

    calculateWait = (l) => {
        let i = l-1;
        let final = 0;
        while (i > 0) {
            final += (i*10);
            i--;
        }
        return final;
    }

    simulate = () => {
        if (this.state.clicked === false || this.state.numPinned < 2) {
            alert("You need to select at least two nodes!")
            return;
        }
        const paths = travelingSalesperson(this.state.pins);
        this.animatePath(paths.flat());
    }

    animatePath = (path) => {
        for (let i = 0; i < path.length; i++) {
            setTimeout(() => {
            this.travel(path[i][0], path[i][1]);}, 10*i);
        }
    }

    travel = (row, col) => { 
        const newNode = {
            col,
            row,
            isStart: this.state.nodes[row][col].isStart,
            pinned: this.state.nodes[row][col].pinned,
            visited: true,
            idNum: this.state.numPinned-1,
        };

        const newNodes = this.state.nodes.slice();
        newNodes[row][col] = newNode;
        this.setState({nodes:newNodes});
    }

    turn = (row, col) => { 
        const start = this.state.clicked ? false : true;
        if (start) {
            this.setState({startRow:row, startCol:col});
        }
        const newNode = {
            col,
            row,
            isStart: start,
            pinned: !this.state.nodes[row][col].pinned,
            visited: false,
            idNum: this.state.numPinned-1,
        };

        const newNumPinned = newNode.pinned ? this.state.numPinned+1 : this.state.numPinned-1;
        const newClicked = newNumPinned === 0 ? false : true;
        const newNodes = this.state.nodes.slice();
        newNodes[row][col] = newNode;

        let newPins = this.state.pins.slice();
        if (newNode.pinned) {
            newPins.push([newNode.row, newNode.col]);
        }
        else {
            newPins = newPins.filter(p => true !== this.arraysEqual(p,[newNode.row, newNode.col]));
        }

        this.setState({nodes:newNodes, numPinned:newNumPinned, clicked:newClicked, pins:newPins});
    }

    render() {
        const nodes = this.state.nodes;

        return (
            <div className="grid">
                {nodes.map((row, rowIdx) => {
                    return (
                        <div key={rowIdx}>
                            {row.map((node, nodeIdx) => {
                                const {col, row, isStart, pinned, visited} = node;
                                return (
                                    <Node 
                                        key={nodeIdx} 
                                        isStart={isStart} 
                                        pinned={pinned}
                                        visited={visited}
                                        customClickEvent={()=>this.turn(row, col)}
                                    >
                                    </Node>);
                            })}
                        </div>
                    )
                })}
                <button onClick={()=> this.simulate()}>Run</button>
                <button onClick={()=> this.clearNodes()}>Clear</button>
            </div>
            
        );
    }

}