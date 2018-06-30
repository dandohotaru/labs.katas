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
      template: (item) => {
        return item.count
          ? `<span>${item.count} events</span>`
          : item.content;
      }
    }

    this.timeline = new Timeline(element, [], groups, options);

    this.service = new ClustersService(this.timeline);
    this.timeline.setItems(this.service.clusters(items));
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
      this.timeline.setItems(this.service.clusters(items));
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