import React from 'react';

export default class Main extends React.Component {
    constructor(props) {
        super(props)
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