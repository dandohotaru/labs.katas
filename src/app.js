"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var greet_1 = require("./greet");
require("./styles.css");
function show(id, name) {
    var element = document.getElementById(id);
    element.innerText = greet_1.hello(name);
}
show("greeting", "Jane Doe");
