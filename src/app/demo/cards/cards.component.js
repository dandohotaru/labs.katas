import template from "./cards.component.hbs";
import styles from "./cards.component.css";
import $ from 'jquery';

export class CardsComponent {

  init(selector){
    $(selector).html(template());

    $('.flip').click(function () {
      $(this).find('.card').toggleClass('flipped');
    });
  }
}