import template from "./profile.component.hbs";
import $ from 'jquery';

export class ProfileComponent {

  selector;

  constructor(selector) {
    this.selector = selector;
  }

  init(){
    var container = $(".root");
    container.html(template());
  }
}