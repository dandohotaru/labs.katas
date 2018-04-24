import template from "./timeline.component.hbs";
import $ from 'jquery';

export class TimelineComponent {

  init(){
    var container = $(".root");
    container.html(template());
  }
}