import moment from 'moment';

export class ClustersService {

  constructor() {
  }

  delta(range) {

    let start = moment(range.start);
    let end = moment(range.end);
    let difference = end.diff(start);
    var duration = moment.duration(difference);

    return {
      years: duration.as("years"),
      months: duration.as("months"),
      weeks: duration.as("weeks"),
      days: duration.as("days"),
      hours: duration.as("hours"),
      minutes: duration.as("minutes"),
    };
  }

  scale(range) {
    let duration = this.delta(range);
    console.log(duration);

    if (duration.years > 1) {
      return { span: 'year', format: "YYMM"};
    }
    else if (duration.months > 3) {
      return { span: 'quarter', format: "YYMMWW" };
    }
    else if (duration.months > 1) {
      return { span: 'month', format: "YYMMDD" };
    }
    else if (duration.weeks > 1) {
      return { span: 'week', format: "YYMMDD" };
    }
    else if (duration.days > 1) {
      return { span: 'day', format: "YYMMDDHH" };
    }
    else {
      return { span: 'hour', format: "YYMMDDHHmm" };
    }
  }

  clusters(data, range, temp) {
 
    let one = moment(range.start);
    let two = moment(range.end);
    let diff = two.diff(one, 'days');
    //console.log({ start: one.format("YYMMDD"), end: two.format("YYMMDD"), diff: diff});

    var scale = this.scale(range);
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

    groups.forEach((items, i) => {
      items.forEach((item, j) => {
        var index = moment(item.start).format(scale.format) + '-group' + item.group;

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