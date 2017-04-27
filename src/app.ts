import {hello} from "./greet";
import  "./styles.css";

function show(id:string, name:string){
    var element = document.getElementById(id);
    element.innerText = hello(name);
}

show("greeting", "Jane Doe");