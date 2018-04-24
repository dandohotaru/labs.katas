import template from "./tasks.component.hbs";
import styles from "./tasks.component.css";
import data from "./tasks.component.json";

export class TasksComponent  {
  
  init(selector) {
    var container = document.querySelector(selector);
    container.innerHTML = template(data);
  }
}