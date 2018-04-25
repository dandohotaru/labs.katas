import template from "./footer.component.hbs";
import styles from "./footer.component.css";

export class FooterComponent {
  
  init(selector) {
    var container = document.querySelector(selector);
    container.innerHTML = template();
  }
}