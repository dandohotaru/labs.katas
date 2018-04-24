import template from "./profile.component.hbs";
import styles from "./profile.component.css";
import $ from 'jquery';

export class ProfileComponent {

  init(selector) {
    $(selector).html(template());
  }
}