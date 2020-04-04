module.exports = function (context) {
    let newContext = context.replace('bind','on');
    return newContext;
}