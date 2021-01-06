import React, {Component} from 'react';
import Node from './Node/Node';

import './TspViz.css';

export default class TspViz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes: [],
        };
    } 

    componentDidMount() {
        const nodes = [];
        const numRows = 20;
        const numCols = 50;
        for (let row=0; row<numRows; row++) {
            const currentRow = [];
            for (let col=0; col<numCols; col++) {
                const currentNode = {
                    col,
                    row,
                    isStart: row === 19 && col === 0,
                    isFinish: row === 0 && col === 49,
                };
                currentRow.push(currentNode);
            }
            nodes.push(currentRow);
        }
        this.setState({nodes})
        console.log("hello")
    }

    render() {
        const nodes = this.state.nodes;
        console.log("redner()")

        return (
            <div className="grid">
                {nodes.map((row, rowIdx) => {
                    return <div key={rowIdx}>
                        {row.map((node, nodeIdx) => {
                            const {isStart, isFinish} = node;
                            return (
                                <Node 
                                    key={nodeIdx} 
                                    isStart={isStart} 
                                    isFinish={isFinish} 
                                    test={'foo'} 
                                    test={'kappa'}
                                >
                                </Node>);
                        })}
                    </div>
                })}
                
            </div>
        );
    }
}