import React from 'react';
import ReactDOM from 'react-dom';
import {
    Link
} from 'react-router-dom';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            <ul>
                <li><Link to='/' />首页</li>
                <li><Link to='/foo' />foo</li>
                <li><Link to='/bar' />bar</li>
            </ul>
        </div>
    }
}