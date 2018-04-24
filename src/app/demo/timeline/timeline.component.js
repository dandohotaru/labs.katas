import template from "./timeline.component.hbs";
import styles from "./timeline.component.css";
import data from "./timeline.component.json";
import moment from 'moment';
import $ from 'jquery';

export class TimelineComponent {

  groups;

  init(selector) {

    // Enrich
    data.records.forEach(p => {
      let time = moment(p.stamp);
      p.stamp = time.toDate();
      p.group = {
        label: time.format("MMM YYYY"),
        value: time.format("YYYYMM")
      };
    });

    // Group
    let index = 0;
    this.groups = data.records
      .sort((a, b) => {
        return a.stamp
          ? b.stamp
            ? +a.stamp - +b.stamp
            : 1
          : -1
      })
      .reduce((results, current) => {
        current.position = index % 2 == 0 ? "left" : "right";
        results.push(current);
        index++;
        return results;
      }, [])
      .reduce((results, current) => {
        var result = results.find(p => p.value == current.group.value);
        if (result) {
          result.items.push(current);
        }
        else {
          result = {
            value: current.group.value,
            label: current.group.label,
            items: [...current]
          };
          results.push(result);
        }

        return results;
      }, [])
      .sort((a, b) => {
        return a.value.localeCompare(b.value);
      });

    $(selector).html(template(this.groups));
  }
}