import template from "./pets.component.hbs";
import datasource from "./pets.component.json";

export class PetsComponent {

  init(selector) {
    var container = document.querySelector(selector);
    container.innerHTML = template(datasource);
  }
}
