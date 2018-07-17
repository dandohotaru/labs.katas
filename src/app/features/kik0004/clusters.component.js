import moment from 'moment';
import formatter from 'moment-duration-format';
import { DataSet, Timeline } from 'vis';
import 'vis/dist/vis-timeline-graph2d.min.css';

import GroupView from "./group.partial.hbs";
import GroupStyles from "./group.partial.css";
import ItemView from "./item.partial.hbs";
import ItemStyles from "./item.partial.css";
import ClustersData from "./records.json";
import ClustersView from "./clusters.component.hbs";
import ClustersStyles from "./clusters.component.css";
import { ClustersService } from "./clusters.service";
import { EventAggregator } from "./../../shared/events/event.bus";

export class ClustersComponent {

  timeline;
  records;
  clusters;
  service;
  scale = 50;
  start;
  end;
  bus;

  constructor() {
    this.service = new ClustersService();
    this.bus = new EventAggregator();
    this.groups = ClustersData['groups']
      .filter(p => p.content == "Football");
    this.records = ClustersData["items"]
      .filter(p => p.group == 1);
  }

  init(selector) {
    let container = document.querySelector(selector);
    container.innerHTML = ClustersView(this);

    this.load();
    this.listen();
  }

  load() {
    var element = document.querySelector(".clusters");

    let options = {
      stack: true,
      height: "500px",
      width: "100%",
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
          ? item.count <= 1
            ? ItemView(item)
            : GroupView(item)
          : item.content;
      },
      onInitialDrawComplete: () => {
        console.timeEnd("timeline: init");
      }
    }

    console.time("timeline: init");
    this.timeline = new Timeline(element, [], this.groups, options);
    this.timeline.setItems([]);
  }

  listen() {
    // zoom
    document.getElementById('zoomIn').onclick = () => {
      this.zoom(0.2);
    };

    document.getElementById('zoomOut').onclick = () => {
      this.zoom(-0.2);
    };

    // scale
    document.getElementById('scaleIn').onclick = () => {
      this.scale += 5;
      this.bus.publish("inputChanged");
    };

    document.getElementById('scaleOut').onclick = () => {
      this.scale -= 5;
      this.bus.publish("inputChanged");
    };

    // ruler
    document.getElementById('scaleDay').onclick = () => {
      this.timeline.setOptions({ timeAxis: { scale: 'day', step: 1 } });
    };

    document.getElementById('scaleWeek').onclick = () => {
      this.timeline.setOptions({ timeAxis: { scale: 'day', step: 7 } });
    };

    document.getElementById('scaleMonth').onclick = () => {
      this.timeline.setOptions({ timeAxis: { scale: 'month', step: 1 } });
    };

    document.getElementById('scaleQuarter').onclick = () => {
      this.timeline.setOptions({ timeAxis: { scale: 'month', step: 3 } });
    };

    document.getElementById('scaleYear').onclick = () => {
      this.timeline.setOptions({ timeAxis: { scale: 'year', step: 1 } });
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

    // events
    this.timeline.on('select', (properties) => {
      if (properties && properties.items && properties.items.length > 0) {
        let temp = this.clusters.filter(p => properties.items.some(q => p.id == q));
        console.log(temp);
      }
    });

    this.timeline.on('rangechanged', (properties) => {
      this.start = properties.start;
      this.end = properties.end;
      this.bus.publish("inputChanged");
    });

    // input
    this.bus.subscribe("inputChanged", (data) => {
      this.infos(this.start, this.end, this.scale);
      this.refresh(this.start, this.end, this.scale);
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

  infos(start, end, counter) {
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

    document.getElementById("range-nice").innerText = duration.range.humanize();
    document.getElementById("range-json").innerText = JSON.stringify(range, null, 2);
    document.getElementById("range-total").innerText = JSON.stringify(rangex, null, 2);
    document.getElementById("slice-nice").innerText = duration.slice.humanize();
    document.getElementById("slice-json").innerText = JSON.stringify(slice, null, 2);
    document.getElementById("slice-total").innerText = JSON.stringify(slicex, null, 2);
  }

  refresh(start, end, counter) {
    console.time("timeline: compute");
    this.clusters = this.service.clusters(this.records, start, end, counter);
    console.timeEnd("timeline: compute");
    console.time("timeline: render");
    this.timeline.setItems(this.clusters);
    console.timeEnd("timeline: render");
  }
}