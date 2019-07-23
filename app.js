require('./main-less.less');
require('./main-css.css');
import ReactDOM from  'react-dom';
import React from 'react';
import Main from './main.js';
ReactDOM.render(
    <Main />,
    document.getElementById('app')
)