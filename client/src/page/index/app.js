import './index.less';
import React from 'react'
import ReactDOM from 'react-dom'
import ClassA from './components/classA'
import ClassB from './components/classB'
import axios from 'axios'
import { Provider } from 'mobx-react';
import stores from './store/index';
import { inject, observer } from 'mobx-react';
import img from './img/123.jpg'
@inject('$store') @observer
export default class App extends React.Component {
    static asyncDate() {
        return axios.get('https://www.fastmock.site/mock/d9c04174a73910e1912e52cdd2de5d90/test123/api/1')
            .then(({ data }) => {
                return data;
            })
            .catch((error) => {
                console.log(error);
            });
    }
    constructor(props) {
        super(props);
        this.state = {
            list: props.$store.poilist || []
        }
    }
    componentDidMount() {
        if (!this.state.list.length) {

            App.asyncDate().then(({ data }) => {

                this.props.$store.replace(data)
            });
        }
    }
    con(data) {
        console.log(data.name);
    }
    render() {
        const { poilist: list } = this.props.$store;
        return (
            <div>
                <h1>你好，我是index首页</h1>
                <a href='/home.html'>home</a><br />
                <a href='/abort.html'>abort</a>
                <div>
                    <ClassA />
                    <img src={img} alt="" />
                    <ClassB />
                </div>

                {list.map((data) => {
                    return <h4 key={data.id} onClick={this.con.bind(this, data)}>{data.name}133</h4>
                })}
            </div >
        );
    }
}

