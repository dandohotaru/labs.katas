export class StaticComponent {

  selector;
  template;

  constructor(selector, template) {
    this.selector = selector;
    this.template = template;
  }

  init() {
    var container = document.getElementById(this.selector);
    if (!container)
      container = document.getElementsByClassName(this.selector)[0];
    container.innerHTML = this.template();
  }
}