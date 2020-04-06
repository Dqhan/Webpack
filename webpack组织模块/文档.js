/**
 *  webpack如何根据场景打包具体文件 =》 组织模块打包原理
 */

/**
 * 参数控制
 * library 目标模块命名
 * libraryTarget 采用何种方式打包{
 *  commonjs
 *  commonjs2
 *  umd
 *  amd
 *  var
 *  this
 *  window
 *  global
 * }
 */

/**
 * 不设置
 */

//输出文件类型
(function (modules) { // webpackBootstrap
    function __webpack_require__(moduleId) {
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        return module.exports;
    }
    return __webpack_require__(__webpack_require__.s = "./util.js");

})({
    "./util.js": (function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        console.log('this is library');
        function a() {
            console.log('a');
        }
        function b() {
            console.log('b');
        }
        __webpack_exports__["default"] = ({
            fn_a: a,
            fn_b: b
        });
    })
});
//整个文件是一个自执行函数，参数是一个对象 包含我们定义得一个模块文件（如果import了其他模块，都在这个对象中）
//然后调用__webpack_require__方法  我们定义得模块文件作为参数，在整个参数中找到我们得模块文件并执行。
//其实就是单单只运行我们的模块文件
//所以代码得到得结果是什么呢？ 就是模块文件执行得结果，也就是将export default出去得对象 定义到了 __webpack_exports__["default"] 中
//这样就不难理解 一个文件export default 出目标， 另一个文件import 这个文件，其实得到得就是这个export default得结果（从__webpack_exports__["default"]获得），
//然后将最后的module.exports 给出去 （为啥？？？？）
//当然我们也执行了一遍我们的文件，这就是webpack给我们的最终结果

/**
 * commonjs  （与commonjs2是一样的只不过差个module.exports跟exports）
 * 整个文件暴漏给exports
 * 浏览器不支持
 */

exports =
    (function (modules) {
        function __webpack_require__(moduleId) {
            modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            return module.exports;
        }
        return __webpack_require__(__webpack_require__.s = "./util.js");
    })({
        "./util.js": (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            console.log('this is library');
            function a() {
                console.log('a');
            }
            function b() {
                console.log('b');
            }
            __webpack_exports__["default"] = ({
                fn_a: a,
                fn_b: b
            });
        })
    });

//可以看出整个自执行函数给了exports，这么做有什么目的呢，如果当前文件作为一个库呢，第一种方案仅仅是将返回值给了 需要import的文件，
//但是我们以类库的形式引入这个文件呢，难道我们要在每个页面都引用这个东西吗，说白了就是我们要找到找到这个文件，然后引用这个文件，只要有需要的地方，都需要引入，并不合理吧。
//所以我们要的是什么，是将整个文件当作一个整体
//这样编译后的文件（也就是我们上面看到的），成了一个可以被别人import的库（仅仅需要一次就可以在另外一个文件得到全部结果），这样我们可以将结果给任何一个地方去import
//就是全局引用的意思

/**
 * commonjs2
 * 整个文件暴漏给module.exports
 * 浏览器不支持
 */

module.exports =
    (function (modules) {
        function __webpack_require__(moduleId) {
            modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            return module.exports;
        }
        return __webpack_require__(__webpack_require__.s = "./util.js");
    })({
        "./util.js": (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            console.log('this is library');
            function a() {
                console.log('a');
            }
            function b() {
                console.log('b');
            }
            __webpack_exports__["default"] = ({
                fn_a: a,
                fn_b: b
            });
        })
    });

/**
 * amd
 * library 必填
 */

define("util", [], function () {
    return (function (modules) { // webpackBootstrap
        function __webpack_require__(moduleId) {
            modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            return module.exports;
        }
        return __webpack_require__(__webpack_require__.s = "./util.js");
    })
        ({
            "./util.js": (function (module, __webpack_exports__, __webpack_require__) {
                "use strict";
                __webpack_require__.r(__webpack_exports__);
                console.log('this is library');
                function a() {
                    console.log('a');
                }
                function b() {
                    console.log('b');
                }
                __webpack_exports__["default"] = ({
                    fn_a: a,
                    fn_b: b
                });
            })
        })
});;

//amd风格暴漏整个文件，是不是很眼熟，这就是大名鼎鼎的requirejs, 定义了一个模块，叫util，数组是依赖引用

/**
 * umd
 * 
 */


(function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === 'object' && typeof module === 'object')
        module.exports = factory();
    else if (typeof define === 'function' && define.amd)
        define([], factory);
    else if (typeof exports === 'object')
        exports["util"] = factory();
    else
        root["util"] = factory();
})(window, function () {
    return (function (modules) {
        function __webpack_require__(moduleId) {
            modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            return module.exports;
        }
        return __webpack_require__(__webpack_require__.s = "./util.js");
    })
        ({
            "./util.js": (function (module, __webpack_exports__, __webpack_require__) {
                "use strict";
                __webpack_require__.r(__webpack_exports__);
                console.log('this is library');
                function a() {
                    console.log('a');
                }
                function b() {
                    console.log('b');
                }
                __webpack_exports__["default"] = ({
                    fn_a: a,
                    fn_b: b
                });
            })
        });
});

/**
 * this
 * window
 * global
 */

this["library"] = _entry_return_;
window["library"] = _entry_return_;
global["library"] = _entry_return_;

/**
 *  异步生成方式
 */

// 在这种情况下，libraryTarget的值为‘jsonp’，组件库入口起点的返回值，会被包裹到一个jsonp包装容器中，并配合webpack的externals使用——组件库的依赖由externals指定。如：

library(_entry_return_);