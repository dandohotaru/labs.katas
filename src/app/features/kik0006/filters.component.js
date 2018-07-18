import template from "./filters.component.hbs";
import styles from "./filters.component.css";
import $ from 'jquery';

export class FiltersComponent {

  init(selector) {
    $(selector).html(template());
  }
}