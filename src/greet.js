var moment = require("moment");
function hello(compiler) {
    var time = moment().format();
    console.log(time);
    return "Hello there " + compiler + " (" + time + ")";
}
