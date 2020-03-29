import React, { Component } from 'react';
import './index.less';
import { action } from 'mobx';
import { inject, observer } from 'mobx-react';

@inject('$store') @observer
export default class ClassB extends Component {
    constructor(props) {
        super(props);
        this.store = props.$store;
    }
    render() {
        const { num, minus, plus, poilist } = this.store;

        return (
            <div className='b'>
                <p>node.js中的fs.existsSync方法使用说明</p>
                <div>{num}</div>
                <button type="button" onClick={minus}>-</button>
                <button type="button" onClick={plus}>+</button>
                <p>由于该方法属于fs模块，使用前需要引入fs模块（var fs= require(“fs”)</p>
                {poilist.map((data) => {
                    return <h4 key={data.id}>{data.name}</h4>
                })}
            </div>
        );
    }
}




