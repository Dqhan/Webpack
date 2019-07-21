var webpack = require('webpack');
var config = require('./webpack.config');
webpack(config, (err, stats) => {
    if (err) {
        return console.error(err);
    }
    if (stats.hasErrors()) {
        return console.error(stats.toString("errors-only"));
    }
    console.log(stats);
})