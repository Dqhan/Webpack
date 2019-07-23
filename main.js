import React from 'react';
import a from './test-a.js';
export default class Main extends React.Component {
    constructor(props) {
        super(props)
        console.log(a);
    }

    render() {
        return <React.Fragment>
            <div className="main">
                <div className="png-pic"></div>
                <div className="jpg-pic"></div>
                <div className="gif-pic"></div>
                <div className="session"></div>
            </div>
        </React.Fragment>
    }
}