import moment from 'moment';
import formatter from 'moment-duration-format';
import { DataSet, Timeline } from 'vis/index-timeline-graph2d';
import 'vis/dist/vis-timeline-graph2d.min.css';

import ClustersData from "./records.json";
import ClustersView from "./clusters.component.hbs";
import ClustersStyles from "./clusters.component.css";
import { ClustersService } from "./clusters.service";

export class ClustersComponent {

  timeline;
  records;
  service;

  init(selector) {

    this.records = ClustersData;

    let container = document.querySelector(selector);
    container.innerHTML = ClustersView(this);

    var element = container.querySelector(".timeline");
    this.load(element);
    this.listen();
  }

  load(element) {

    var groups = this.records['groups'];
    var items = this.records['items'];

    let options = {
      stack: true,
      orientation: 'top',
      showCurrentTime: true,
      moveable: true,
      min: new Date(2016, 0, 1),
      max: new Date(2017, 0, 1),
      start: new Date(2016, 8, 1),
      end: new Date(2016, 10, 1),
      zoomMin: moment.duration(1, 'days').asMilliseconds(),
      zoomMax: moment.duration(6, 'months').asMilliseconds(),
      template: (item, element, data) => {
        return item.count
          ? `<span>${item.count} events</span>`
          : item.content;
      }
    }

    this.service = new ClustersService();

    this.timeline = new Timeline(element, [], groups, options);
    var range = this.timeline.getWindow();
    let clusters = this.service.clusters(items, range);
    this.timeline.setItems(clusters);
  }

  listen() {
    document.getElementById('zoomIn').onclick = () => this.zoom(0.2);
    document.getElementById('zoomOut').onclick = () => this.zoom(-0.2);

    this.timeline.on('select', (properties) => {
    });

    this.timeline.on('rangechange', (properties) => {
    });

    this.timeline.on('rangechanged', (properties) => {
      let items = this.records['items'];
      let range = {
        start: properties.start,
        end: properties.end
      };
      let clusters = this.service.clusters(items, range);
      this.timeline.setItems(clusters);
    });

    this.timeline.on('click', (properties) => {
    });
  }

  zoom(percentage) {
    if (percentage >= 0) {
      this.timeline.zoomIn(percentage);
    } else {
      this.timeline.zoomOut(Math.abs(percentage));
    }
  }
}