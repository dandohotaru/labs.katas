require('lodash');
require('file?name=[name].[ext]!./index.html');

function component(){

    var element = document.createElement("div");

    var texts = ['Here', 'be', 'dragons'];

    element.innerHTML = _.reduce(texts, function(result, item){
        result = result + item + " ";
        return result;
    }, "");

    return element;
}

var root = document.getElementById("root");
root.appendChild(component());
