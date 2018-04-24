export class DynamicComponent {

  selector;
  template;
  datapath;

  constructor(selector, template, datapath){
    this.selector = selector;
    this.template = template;
    this.datapath = datapath;
  }

  init() {
    var request = new XMLHttpRequest();

    request.open('GET', this.datapath);

    request.onload = event => {

      if (request.status >= 200 && request.status < 400) {
        var data = JSON.parse(request.responseText);
        var container = document.getElementById(this.selector);
        if (!container)
          container = document.getElementsByClassName(this.selector)[0];
        container.innerHTML = this.template(data);
      } else {
        console.log(`Error: ${request.status} - ${request.statusText})`);
      }
    };

    request.onerror = event => {
      console.log(`Error: ${event}`);
    };

    request.send();
  }

}