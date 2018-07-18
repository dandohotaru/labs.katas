import template from "./head.component.hbs";
import styles from "./head.component.css";
import $ from 'jquery';

export class HeadComponent {

  init(selector) {
    $(selector).html(template());
  }
}