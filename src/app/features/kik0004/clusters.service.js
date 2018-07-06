import moment from 'moment';

export class ClustersService {

  constructor() {
  }

  scale(range) {
    // Calculate
    let start = moment(range.start);
    let end = moment(range.end);
    let difference = end.diff(start);
    let duration = {
      span: moment.duration(difference),
      segment: moment.duration(difference / 50),
    };
    let span = {
      minutes: this.round(duration.span.minutes()),
      hours: this.round(duration.span.hours()),
      days: this.round(duration.span.days()),
      months: this.round(duration.span.months()),
      years: this.round(duration.span.years()),
    };
    let unit = {
      minutes: this.round(duration.segment.minutes()),
      hours: this.round(duration.segment.hours()),
      days: this.round(duration.segment.days()),
      months: this.round(duration.segment.months()),
      years: this.round(duration.segment.years()),
    };

    // Print
    document.getElementById("span-nice").innerText = duration.span.humanize();
    document.getElementById("span-json").innerText = JSON.stringify(span, null, 2);
    document.getElementById("unit-nice").innerText = duration.segment.humanize();
    document.getElementById("unit-json").innerText = JSON.stringify(unit, null, 2);
    document.getElementById("unit-total").innerText = JSON.stringify({
      minutes: this.round(duration.segment.as("minutes")),
      hours: this.round(duration.segment.as("hours")),
      days: this.round(duration.segment.as("days")),
      months: this.round(duration.segment.as("months")),
      years: this.round(duration.segment.as("years")),
    }, null, 2);

    // Pair
    if (duration.span.as("years") > 1) {
      return { span: 'year', format: "YYMM" };
    }
    else if (duration.span.as("months") > 3) {
      return { span: 'quarter', format: "YYMMWW" };
    }
    else if (duration.span.as("months") > 1) {
      return { span: 'month', format: "YYMMDD" };
    }
    else if (duration.span.as("weeks") > 1) {
      return { span: 'week', format: "YYMMDD" };
    }
    else if (duration.span.as("days") > 1) {
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

  round(value){
    return Math.round(value * 10) / 10;
  }
}