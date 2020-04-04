const fs = require('fs');
const path = require('path');

module.exports = MyPlugin;

function MyPlugin() {

}

MyPlugin.prototype.apply = function (complier) {
    //apply监听webpack构建周期
    //done 写入文件结束
    //emit
    //
    complier.hooks.done.top('changeStatic', function (compliation) {
        let context = complier.options.context;//全局路径
        let pubilcPath = path.resolve(context, 'dist');
        compliation.toJson().assets.forEach(ast => {
            const filePath = path.resolve(pubilcPath, ast.name);
            fs.readFile(filePath, function (err, file) {
                var newcontext = file.toString().replace('./Static', 'www.xxx.com');
                fs.writeFile(filePath, newcontext, function () {
                    
                });
            })
        })
    })
}