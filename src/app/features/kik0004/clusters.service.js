import moment from 'moment';

export class ClustersService {

  constructor() {
  }

  delta(start, end) {
    var second = 1000;
    var minute = second * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var month = day * 31;
    var year = month * 12;

    // Convert both dates to milliseconds
    var diff = end.getTime() - start.getTime();

    // Convert back to components and return
    return {
      years: Math.round(diff / year),
      months: Math.round(diff / month),
      days: Math.round(diff / day),
      hours: Math.round(diff / hour),
      minutes: Math.round(diff / minute)
    };
  }

  scale(start, end) {
    // Use the range information in order to know how to cluster data
    var diff = this.delta(start, end);
    console.log(diff);

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

  clusters(data, range) {
    var scale = this.scale(range.start, range.end);

    var group = data
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

    group.forEach((items, i) => {
      items.forEach((item, j) => {
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