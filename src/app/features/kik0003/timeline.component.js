import moment from 'moment';
import styles from "./timeline.component.css";
import TimelineView from "./timeline.component.hbs";
import DetailsView from "./record.partial.hbs";
import TimelineData from "./meetup.json";

import { DataSet, Timeline } from 'vis/index-timeline-graph2d';
import 'vis/dist/vis-timeline-graph2d.min.css';

export class TimelineComponent {

  timeline;
  events;
  current;

  init(selector) {

    this.events = TimelineData.events;

    var container = document.querySelector(selector);
    container.innerHTML = TimelineView(this);

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
        let content = `
          <span class="item">
            <span class="name">${p.name}</span>
            <span class="counter">${p.yes_rsvp_count}</span>
          </span>
        `
        return {
          id: p.id,
          start: new Date(p.local_date),
          end: null,
          content: content,
          title: location,
          type: "box",
        };
      });

    var data = new DataSet(projections, {
      type: { 
        start: 'Date', 
        end: 'Date', 
      }
    });

    var facets =
      {
        visibility: this.events
          .filter(p => !!p.visibility)
          .reduce((results, current) => {
            let found = results.find(p => p == current.visibility);
            if (!found) {
              results.push(current.visibility);
            }
            return results;
          }, []),
        cities: this.events
          .filter(p => !!p.venue && !!p.venue.city)
          .reduce((results, current) => {
            let found = results.find(p => p == current.venue.city);
            if (!found) {
              results.push(current.venue.city);
            }
            return results;
          }, [])
          .sort((a, b) => a.localeCompare(b)),
        limits: this.events
          .filter(p => !!p.rsvp_limit)
          .reduce((results, current) => {
            let found = results.find(p => p == current.rsvp_limit);
            if (!found) {
              results.push(current.rsvp_limit);
            }
            return results;
          }, [])
          .sort((a, b) => a - b),
      };

    console.log(facets);

    var options = {
      stack: true,
      height: '600px',
      orientation: 'top',
      min: new Date(2018, 0, 1),
      max: new Date(2019, 0, 1),
      zoomMin: moment.duration(1, 'days').asMilliseconds(),
      zoomMax: moment.duration(2, 'months').asMilliseconds(),
      dataAttributes: ['visibility'],
      margin: {
        item: 10, 
        axis: 5,
      },
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
    document.getElementById('moveCenter').onclick = () => this.move(0);
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

  select(id) {
    this.current = this.events.find(p => p.id == id);

    var element = document.querySelector(".current");
    element.innerHTML = DetailsView(this.current);
  }

  trace(event, data) {
    console.log(event);
    if (data)
      console.debug(data);
  }

}