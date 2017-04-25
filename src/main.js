"use strict";
var greet_1 = require("./greet");
function show(id, name) {
    var element = document.getElementById(id);
    element.innerText = greet_1.hello(name);
}
show("greeting", "Jane Doe");
