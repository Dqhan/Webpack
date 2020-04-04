var treeShaking = function () {
    console.log('tree shaking.');
    return;
    function unused() {
        return 'unused';
    };
}

treeShaking();