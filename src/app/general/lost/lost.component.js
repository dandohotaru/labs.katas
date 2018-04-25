import template from "./lost.component.hbs";

export class LostComponent {

  init(selector) {
    var container = document.querySelector(selector);
    container.innerHTML = template();
  }
}