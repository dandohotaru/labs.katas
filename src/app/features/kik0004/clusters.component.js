import template from "./clusters.component.hbs";
import styles from "./clusters.component.css";
import data from "./records.json";
import $ from 'jquery';

export class ClustersComponent {

  init(selector) {
    $(selector).html(template());
  }
}