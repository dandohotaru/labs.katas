import template from "./profile.component.hbs";
import $ from 'jquery';

export class ProfileComponent {

  init(){
    var container = $(".root");
    container.html(template());
  }
}