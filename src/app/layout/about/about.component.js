import template from "./about.component.hbs";

export class AboutComponent {
  init() {
    var container = document.querySelector(".root");
    container.innerHTML = template();
  }
}