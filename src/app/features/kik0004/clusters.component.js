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

    var element = container.querySelector(".clusters");
    this.load(element);
    this.listen();
  }

  load(element) {

    var groups = this.records['groups'].filter(p => p.content == "Football");
    var items = this.records['items'];

    let options = {
      stack: true,
      height: '600px',
      orientation: 'top',
      showCurrentTime: true,
      moveable: true,
      min: new Date(2018, 0, 1),
      max: new Date(2019, 0, 1),
      start: new Date(2018, 8, 1),
      end: new Date(2018, 9, 1),
      zoomMin: moment.duration(1, 'days').asMilliseconds(),
      zoomMax: moment.duration(1, 'years').asMilliseconds(),
      template: (item, element, data) => {
        // ToDo: Move markup to dedicated template [DanD]
        let many = (group)=> {
          return `<span>${group.count} events</span>`;
        };
        
        let some = (group)=>{
          let result = "";
          group.items.forEach(item=>{
            let markup = `
              <div>
                <strong>${item.content}</strong>
              </div>
            `;
            result = result.concat(markup);
          })
          return result;
        }

        return item.count
          ? item.count <= 2
            ? some(item)
            : many(item)
          : item.content;
      }
    }

    this.service = new ClustersService();

    this.timeline = new Timeline(element, [], groups, options);
    var range = this.timeline.getWindow();
    let temp = {
      scale: this.timeline.timeAxis.step.scale,
      step: this.timeline.timeAxis.step.step,
    };
    let clusters = this.service.clusters(items, range, temp.scale);
    this.timeline.setItems(clusters);
  }

  listen() {
    document.getElementById('zoomIn').onclick = () => {
      this.zoom(0.2);
    };

    document.getElementById('zoomOut').onclick = () => {
      this.zoom(-0.2);
    };

    document.getElementById('scaleDay').onclick = () => { 
      this.timeline.setOptions({ timeAxis: { scale: 'day', step: 1 }}); 
    };

    document.getElementById('scaleWeek').onclick = () => { 
      this.timeline.setOptions({ timeAxis: { scale: 'day', step: 7 }}); 
    };

    document.getElementById('scaleMonth').onclick = () => { 
      this.timeline.setOptions({ timeAxis: { scale: 'month', step: 1 }}); 
    };

    document.getElementById('scaleQuarter').onclick = () => { 
      this.timeline.setOptions({ timeAxis: { scale: 'month', step: 3 }}); 
    };

    document.getElementById('scaleYear').onclick = () => { 
      this.timeline.setOptions({ timeAxis: { scale: 'year', step: 1 }}); 
    };

    this.timeline.on('select', (properties) => {
    });

    this.timeline.on('rangechange', (properties) => {

    });

    this.timeline.on('rangechanged', (properties) => {
      let temp = {
        scale: this.timeline.timeAxis.step.scale,
        step: this.timeline.timeAxis.step.step,
      };
      console.log(temp);

      let items = this.records['items'];
      let range = {
        start: properties.start,
        end: properties.end
      };
      let clusters = this.service.clusters(items, range, temp.scale);
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