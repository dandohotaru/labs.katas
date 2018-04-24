import template from "./tasks.component.hbs";
import datasource from "./tasks.component.json";

export class TasksComponent  {
  
  init(selector) {
    var container = document.querySelector(selector);
    container.innerHTML = template(datasource);
  }
}