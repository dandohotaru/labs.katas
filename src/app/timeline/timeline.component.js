import template from "./timeline.component.hbs";
import $ from 'jquery';

export class TimelineComponent {

  selector;

  constructor(selector) {
    this.selector = selector;
  }

  init(){
    var container = $(".root");
    container.html(template());
  }
}