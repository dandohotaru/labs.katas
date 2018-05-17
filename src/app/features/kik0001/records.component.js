import template from "./records.component.hbs";
import styles from "./records.component.css";
import data from "./records.json";
import $ from 'jquery';

export class RecordsComponent  {
  
  init(selector) {
    $(selector).html(template(data));
  }
}