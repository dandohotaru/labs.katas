import template from "./cards.component.hbs";
import $ from 'jquery';

export class CardsComponent {

  init(){
    var container = $(".root");
    container.html(template());

    $('.flip').hover(function () {
      $(this).find('.card').toggleClass('flipped');
    });
  }
}