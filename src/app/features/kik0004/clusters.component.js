import moment from 'moment';
import formatter from 'moment-duration-format';
import { DataSet, Timeline } from 'vis/index-timeline-graph2d';
import 'vis/dist/vis-timeline-graph2d.min.css';

import ClustersData from "./records.json";
import ClustersView from "./clusters.component.hbs";
import ClustersStyles from "./clusters.component.css";

export class ClustersComponent {

  timeline;
  records;

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
          ? ("<span>" + item.count + " évenement" + ((item.count > 1)
            ? 's'
            : '') + "</span>")
          : item.content;
      }
    }

    this.timeline = new Timeline(
      element,
      [],
      groups,
      options
    );

    var clusters = new Clusteriser(this.timeline);
    this.timeline.setItems(clusters.getClusters(items));

    this.timeline.on('rangechanged', ()=> {
      this.timeline.setItems(clusters.getClusters(items));
    });
  }

  listen() {
    this.timeline.on('select', (properties) => {
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
}

var Clusteriser = function (timeline) {
  this.timeline = timeline;

  this.getDiffDate = function (date1, date2) {
    var second = 1000;
    var minute = second * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var month = day * 31;
    var year = month * 12;

    // Convert both dates to milliseconds
    var diff = date2.getTime() - date1.getTime();

    // Convert back to components and return
    return {
      years: Math.round(diff / year),
      months: Math.round(diff / month),
      days: Math.round(diff / day),
      hours: Math.round(diff / hour),
      minutes: Math.round(diff / minute)
    };
  }

  //Get the scale between two date
  //We can use the scale information from timeline api in order to know how to cluster data
  this.getScale = function (start, end) {
    var diff = this.getDiffDate(start, end);

    if (diff.months > 12 * 2) {
      return 'year';
    }
    else if (diff.days > 31) {
      return 'month';
    }
    else if (diff.hours > 24) {
      return 'day';
    }
    else if (diff.minutes > 60) {
      return 'hour';
    }
    else {
      return 'second';
    }
  }

  this.getClusters = function (dataItems) {
    var timelineWindow = this.timeline.getWindow();

    var scale = this.getScale(timelineWindow.start, timelineWindow.end);

    //var group = _.toArray(_.groupBy(dataItems, 'group'));;
    var group = dataItems
      .reduce((output, current) => {
        var found = output.find(p => p.key == current.group);
        if (found) {
          found.items.push(current);
        }
        else {
          found = {
            key: current.group,
            items: [current],
          };
          output.push(found);
        }

        return output;
      }, [])
      .map(p => {
        return p.items;
      });


    var result = {};

    var formatByScale = {
      year: 'Y',
      month: 'Y-M',
      weekday: 'Y-M-week-W',
      day: 'Y-M-day-D',
      hour: 'Y-M-D-H',
      second: 'Y-M-D-H-m'
    };

    group.forEach(function (items, i) {
      items.forEach(function (item, j) {
        var index = moment(item.start).format(formatByScale[scale]) + '-group' + item.group;

        if (!result[index]) {
          result[index] = {
            count: 1,
            items: [],
            group: item.group,
            start: item.start
          };
        }

        result[index].items.push(item);
        result[index].count++;
      })
    });

    var temp = Object.keys(result).map(i => result[i]);
    return temp;
  }
}