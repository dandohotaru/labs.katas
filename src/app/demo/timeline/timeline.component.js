import template from "./timeline.component.hbs";
import styles from "./timeline.component.css";
import data from "./timeline.component.json";
import moment from 'moment';
import $ from 'jquery';

export class TimelineComponent {

  groups;

  init(selector) {
    $(selector).html(template(data));

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
    this.groups = data.records
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

    console.log(this.groups);
  }
}