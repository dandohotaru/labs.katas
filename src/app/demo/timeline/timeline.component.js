import template from "./timeline.component.hbs";
import styles from "./timeline.component.css";
import $ from 'jquery';

export class TimelineComponent {

  init(selector){
    $(selector).html(template());
  }
}