import moment from 'moment';

export class ClustersService {

  constructor() {
  }

  delta(start, end) {

    let left = moment(start);
    let right = moment(end);
    let difference = right.diff(left);
    var duration = moment.duration(difference);

    var result = {
      years: duration.as("years"),
      months: duration.as("months"),
      weeks: duration.as("weeks"),
      days: duration.as("days"),
      hours: duration.as("hours"),
      minutes: duration.as("minutes"),
    };

    return result;
  }

  scale(start, end) {
    // Use the range information in order to know how to cluster data
    let duration = this.delta(start, end);
    console.log(duration);

    if (duration.years > 1) {
      return 'year';
    }
    else if (duration.months > 3) {
      return 'quarter';
    }
    else if (duration.months > 1) {
      return 'month';
    }
    else if (duration.weeks > 1) {
      return 'week';
    }
    else if (duration.days > 1) {
      return 'day';
    }
    else if (duration.hours > 1) {
      return 'hour';
    }
    else {
      return 'second';
    }
  }

  clusters(data, range, temp) {
 
    let one = moment(range.start);
    let two = moment(range.end);
    let diff = two.diff(one, 'days');
    //console.log({ start: one.format("YYMMDD"), end: two.format("YYMMDD"), diff: diff});

    var scale = this.scale(range.start, range.end);
    console.log(scale);

    var groups = data
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

    // var formatByScale = {
    //   year: 'Y',
    //   quarter: 'Q',
    //   month: 'Y-M',
    //   week: 'WW',
    //   weekday: 'Y-M-week-W',
    //   day: 'Y-M-day-D',
    //   hour: 'Y-M-D-H',
    //   second: 'Y-M-D-H-m'
    // };

    var formatByScale = {
      year: 'Y',
      quarter: 'YYMMWW',
      month: 'YYMMDD',
      week: 'YYMMDD',
      day: 'YYMMDDHH',
      hour: 'YYMMDDHHmm',
    };

    groups.forEach((items, i) => {
      items.forEach((item, j) => {
        var index = moment(item.start).format(formatByScale[scale]) + '-group' + item.group;

        if (!result[index]) {
          result[index] = {
            count: 1,
            items: [],
            group: item.group,
            start: item.start,
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