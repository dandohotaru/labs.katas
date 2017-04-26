"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
function hello(compiler) {
    var time = moment().format();
    console.log(time);
    return "Hello there " + compiler + " (" + time + ")";
}
exports.hello = hello;
console.log("test");
