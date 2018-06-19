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

    var element = container.querySelector(".timeline");
    this.load(element);
    this.listen();
  }

  load(element) {
    var data = new DataSet(records);
    var options = {
      onInitialDrawComplete: () => {
        this.trace("loaded");
      },
    };
    this.timeline = new Timeline(element, data, options);
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

  listen(){
    document.getElementById('zoomIn').onclick = () => this.zoom(0.2);
    document.getElementById('zoomOut').onclick = () => this.zoom(-0.2);
    document.getElementById('moveLeft').onclick = () => this.move(0.2);
    document.getElementById('moveRight').onclick = () => this.move(-0.2);

    this.timeline.on('rangechange', (properties) => {
      this.trace('rangechange', properties);
    });

    this.timeline.on('rangechanged', (properties) => {
      this.trace('rangechanged', properties);
    });

    this.timeline.on('select', (properties) => {
      this.trace('select', properties);
    });

    this.timeline.on('click', (properties) => {
      this.trace('click', properties);
    });

    this.timeline.on('doubleClick', (properties) => {
      this.trace('doubleClick', properties);
    });

    this.timeline.on('contextmenu', (properties) => {
      this.trace('contextmenu', properties);
    });

    this.timeline.on('mouseDown', (properties) => {
      this.trace('mouseDown', properties);
    });

    this.timeline.on('mouseUp', (properties) => {
      this.trace('mouseUp', properties);
    });

  }

  trace(event, data){
    console.log(event);
    if (data)
      console.debug(data);
  }

}