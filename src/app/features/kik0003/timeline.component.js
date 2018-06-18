import moment from 'moment';
import template from "./timeline.component.hbs";
import styles from "./timeline.component.css";
import records from "./records.json";

import { DataSet, Timeline } from 'vis/index-timeline-graph2d';
import 'vis/dist/vis-timeline-graph2d.min.css';

export class TimelineComponent  {
  
  init(selector) {
    
    var container = document.querySelector(selector);
    container.innerHTML = template();

    var timeline = container.querySelector(".timeline");
    this.load(timeline);
  }

  load(element) {
    var data = new DataSet(records);
    var timeline = new Timeline(element, data, {});
  }
}