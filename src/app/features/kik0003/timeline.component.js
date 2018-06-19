import moment from 'moment';
import template from "./timeline.component.hbs";
import styles from "./timeline.component.css";
import records from "./records.json";

import { DataSet, Timeline } from 'vis/index-timeline-graph2d';
import 'vis/dist/vis-timeline-graph2d.min.css';

export class TimelineComponent {

  timeline;

  init(selector) {

    var container = document.querySelector(selector);
    container.innerHTML = template();

    var timeline = container.querySelector(".timeline");
    this.load(timeline);
  }

  load(element) {
    var data = new DataSet(records);
    this.timeline = new Timeline(element, data, {});

    document.getElementById('zoomIn').onclick = () => this.zoom(0.2);
    document.getElementById('zoomOut').onclick = () => this.zoom(-0.2);
    document.getElementById('moveLeft').onclick = () => this.move(0.2);
    document.getElementById('moveRight').onclick = () => this.move(-0.2);
  }

  zoom(percentage) {
    if (percentage >= 0) {
      this.timeline.zoomIn(percentage);
    } else {
      this.timeline.zoomOut(Math.abs(percentage));
    }
  }

  move(percentage) {
    var range = this.timeline.getWindow();
    var interval = range.end - range.start;

    this.timeline.setWindow({
      start: range.start.valueOf() - interval * percentage,
      end: range.end.valueOf() - interval * percentage
    });
  }
}