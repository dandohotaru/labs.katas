import template from "./animals.component.hbs";
import styles from "./animals.component.css";
import data from "./animals.component.json";

export class AnimalsComponent {

  init(selector) {
    var container = document.querySelector(selector);
    container.innerHTML = template(data);
  }
}
