import template from "./home.component.hbs";

export class HomeComponent {

  init(selector) {
    var container = document.querySelector(selector);
    container.innerHTML = template();
  }
}