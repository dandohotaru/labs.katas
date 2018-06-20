import moment from 'moment';
import template from "./timeline.component.hbs";
import styles from "./timeline.component.css";
import records from "./records.json";
import meetup from "./meetup.json";

import { DataSet, Timeline } from 'vis/index-timeline-graph2d';
import 'vis/dist/vis-timeline-graph2d.min.css';

export class TimelineComponent {

  timeline;
  events;

  init(selector) {

    this.events = meetup.events;

    var container = document.querySelector(selector);
    container.innerHTML = template();

    var element = container.querySelector(".timeline");
    this.load(element);
    this.listen();
  }

  load(element) {
    var projections = this.events
      .map(p => {
        let location = p.venue
          ? `${p.venue.name}, ${p.venue.city}`
          : "TBD";
        return {
          id: p.id,
          start: new Date(p.local_date),
          end: null,
          content: p.name,
          title: location,
        };
      });
    var data = new DataSet(projections);

    var options = {
      height: '600px',
      min: new Date(2018, 0, 1),
      max: new Date(2019, 0, 1),
      zoomMin: moment.duration(1, 'days').asMilliseconds(),
      zoomMax: moment.duration(2, 'months').asMilliseconds(),
      onInitialDrawComplete: () => {
        this.trace("loaded");
      },
    };
    this.timeline = new Timeline(element, data, options);
  }

  listen() {
    document.getElementById('zoomIn').onclick = () => this.zoom(0.2);
    document.getElementById('zoomOut').onclick = () => this.zoom(-0.2);
    document.getElementById('moveLeft').onclick = () => this.move(0.2);
    document.getElementById('moveRight').onclick = () => this.move(-0.2);

    this.timeline.on('select', (properties) => {
      this.trace('select', properties);
      let id = properties && properties.items && properties.items.length > 0
        ? properties.items[0]
        : null;
      this.select(id);
    });

    this.timeline.on('rangechange', (properties) => {
    });

    this.timeline.on('rangechanged', (properties) => {
    });

    this.timeline.on('click', (properties) => {
    });

    this.timeline.on('doubleClick', (properties) => {
    });

    this.timeline.on('contextmenu', (properties) => {
    });

    this.timeline.on('mouseDown', (properties) => {
    });

    this.timeline.on('mouseUp', (properties) => {
    });
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

  select(id) {
    var event = this.events.find(p => p.id == id);
    console.log(event);
  }

  trace(event, data) {
    console.log(event);
    if (data)
      console.debug(data);
  }

}