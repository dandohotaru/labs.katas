import template from "./contact.component.hbs";
import $ from 'jquery';

export class ContactComponent {

  init(){
    var container = $(".root");
    container.html(template());

    $('.flip').hover(function () {
      $(this).find('.card').toggleClass('flipped');
    });
  }
}