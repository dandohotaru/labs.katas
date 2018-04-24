import template from "./pets.component.hbs";
import styles from "./pets.component.css";
import data from "./pets.component.json";

export class PetsComponent {

  init(selector) {
    var container = document.querySelector(selector);
    container.innerHTML = template(data);
  }
}
