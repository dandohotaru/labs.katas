import template from "./sample.component.hbs";
import styles from "./sample.component.css";
import data from "./sample.component.json";
import $ from 'jquery';

export class SampleComponent  {
  
  init(selector) {
    $(selector).html(template(data));
  }
}