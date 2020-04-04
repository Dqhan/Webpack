require('./main-less.less');
require('./main-css.css');
const ReactDOM = require('react-dom');
const React = require('react');
import Main from './main.js';
/**
 *  引入 scope hisiting test
 */
import B from './ScopeHisitingTest/b';
ReactDOM.render(
    <Main />,
    document.getElementById('app')
)