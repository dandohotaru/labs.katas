import css from './styles.css';
import _ from 'lodash';
import {hello} from "./greet"

var runWithLodash = function () {
    var array = [1];
    var other = _.concat(array, 2, [3], [[4]]);
    console.log(other);
}

var runWithLambda = function () {
    var array = [1];
    var other = array.concat([2, 3, [4]])
    console.log(other);
}

var greetUser = function show(id, name){
    let element = document.getElementById(id);
    let greeting = hello(name);
    element.innerText = greeting;
    console.log(greeting);
}

runWithLodash();
runWithLambda();
greetUser("greeting", "Jane Doe");

