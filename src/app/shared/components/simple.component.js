export class SimpleComponent {

  selector;
  template;
  datasource;

  constructor(selector, template, datasource){
    this.selector = selector;
    this.template = template;
    this.datasource = datasource;
  }

  init() {
    var container = document.getElementById(this.selector);
    if (!container)
      container = document.getElementsByClassName(this.selector)[0];
    container.innerHTML = this.template(this.datasource);
  }
}