import React, { Component } from 'react'
import './index.less'
import { inject, observer } from 'mobx-react';

@inject('$store') @observer
export default class ClassA extends Component {
    constructor(props) {
        super(props);
        this.state = {
            num: 111
        }
    }

    click(num) {
        this.setState({
            num: this.state.num + num
        })
    }

    render() {
        return (
            <div className='classA'>
                <div>{this.state.num} || {this.props.$store.num}</div>
                <button type="button" onClick={this.click.bind(this, -1)}>-</button>
                <button type="button" onClick={this.click.bind(this, 1)}> +</button>
            </div>
        );
    }
}

