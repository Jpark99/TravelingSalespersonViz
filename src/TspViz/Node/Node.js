import React, {Component} from 'react';

import './Node.css';

export default class Node extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const {isStart, pinned, visited} = this.props;
        const extraClassName = 
            isStart ? 'node-start'
            : pinned ? 'node-pinned'
            : visited ? 'node-visited'
            : '';

        return <div className={`node ${extraClassName}`} onClick={this.props.customClickEvent}></div>
    }
}

export const DEFAULT_NODE = {
    row: 0,
    col: 0,
};