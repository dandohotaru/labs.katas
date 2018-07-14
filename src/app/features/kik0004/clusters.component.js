import moment from 'moment';
import formatter from 'moment-duration-format';
import { DataSet, Timeline } from 'vis/index-timeline-graph2d';
import 'vis/dist/vis-timeline-graph2d.min.css';

import GroupView from "./group.partial.hbs";
import GroupStyles from "./group.partial.css";
import ItemView from "./item.partial.hbs";
import ItemStyles from "./item.partial.css";
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
      height: '500px',
      orientation: 'top',
      showCurrentTime: true,
      moveable: true,
      min: new Date(2018, 0, 1),
      max: new Date(2019, 0, 1),
      start: new Date(2018, 8, 1),
      end: new Date(2018, 9, 1),
      zoomMin: moment.duration(1, 'hours').asMilliseconds(),
      zoomMax: moment.duration(1, 'years').asMilliseconds(),
      template: (item, element, data) => {
        return item.count
          ? item.count <= 2
            ? ItemView(item)
            : GroupView(item)
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
    // zoom
    document.getElementById('zoomIn').onclick = () => {
      this.zoom(0.2);
    };

    document.getElementById('zoomOut').onclick = () => {
      this.zoom(-0.2);
    };

    // focus
    document.getElementById('focusIn').onclick = () => {
      // ToDo: to be implemented [DanD]
    };

    document.getElementById('focusOut').onclick = () => {
      // ToDo: to be implemented [DanD]
    };

    // move
    document.getElementById('moveLeft').onclick = () => {
      this.move(0.2);
    }

    document.getElementById('moveCenter').onclick = () => {
      this.move(0);
    }

    document.getElementById('moveRight').onclick = () => {
      this.move(-0.2);
    }

    // scale
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
      // Make counter reacting to user input [DanD]
      let counter = 50;
      let start = properties.start;
      let end = properties.end;
      this.infos(start, end, counter)

      let items = this.records['items'];
      let clusters = this.service.clusters(items, start, end, counter);
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

  move(percentage) {
    if (percentage == 0) {
      this.timeline.moveTo(new Date(), { animation: true }, (props) => {
        console.log("movedTo", props);
      });
    }
    else {
      var range = this.timeline.getWindow();
      var interval = range.end - range.start;

      this.timeline.setWindow({
        start: range.start.valueOf() - interval * percentage,
        end: range.end.valueOf() - interval * percentage
      });
    }
  }

  infos(start, end, counter){
    let round = (value) => Math.round(value * 10) / 10;
    let difference = moment(end).diff(moment(start));
    let duration = {
      range: moment.duration(difference),
      slice: moment.duration(difference / counter),
    };
    let range = {
      years: round(duration.range.years()),
      months: round(duration.range.months()),
      weeks: round(duration.range.weeks()),
      days: round(duration.range.days()),
      hours: round(duration.range.hours()),
      minutes: round(duration.range.minutes()),
    };
    let rangex = {
      years: round(duration.range.asYears()),
      months: round(duration.range.asMonths()),
      weeks: round(duration.range.asWeeks()),
      days: round(duration.range.asDays()),
      hours: round(duration.range.asHours()),
      minutes: round(duration.range.asMinutes()),
    };
    let slice = {
      years: round(duration.slice.years()),
      months: round(duration.slice.months()),
      weeks: round(duration.slice.weeks()),
      days: round(duration.slice.days()),
      hours: round(duration.slice.hours()),
      minutes: round(duration.slice.minutes()),
    };
    let slicex = {
      years: round(duration.slice.asYears()),
      months: round(duration.slice.asMonths()),
      weeks: round(duration.slice.asWeeks()),
      days: round(duration.slice.asDays()),
      hours: round(duration.slice.asHours()),
      minutes: round(duration.slice.asMinutes()),
    };

    document.getElementById("span-nice").innerText = duration.range.humanize();
    document.getElementById("span-json").innerText = JSON.stringify(range, null, 2);
    document.getElementById("span-total").innerText = JSON.stringify(rangex, null, 2);
    document.getElementById("unit-nice").innerText = duration.slice.humanize();
    document.getElementById("unit-json").innerText = JSON.stringify(slice, null, 2);
    document.getElementById("unit-total").innerText = JSON.stringify(slicex, null, 2);
  }
}