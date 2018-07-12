import moment from 'moment';

export class ClustersService {

  constructor() {
  }

  scale(range) {

    // Compute
    let counter = 25;
    let start = moment(range.start);
    let end = moment(range.end);
    let difference = end.diff(start);
    let duration = {
      span: moment.duration(difference),
      segment: moment.duration(difference / counter),
    };
    let span = {
      years: this.round(duration.span.years()),
      months: this.round(duration.span.months()),
      weeks: this.round(duration.span.weeks()),
      days: this.round(duration.span.days()),
      hours: this.round(duration.span.hours()),
      minutes: this.round(duration.span.minutes()),
    };
    let spanx = {
      years: this.round(duration.span.asYears()),
      months: this.round(duration.span.asMonths()),
      weeks: this.round(duration.span.asWeeks()),
      days: this.round(duration.span.asDays()),
      hours: this.round(duration.span.asHours()),
      minutes: this.round(duration.span.asMinutes()),
    };
    let unit = {
      years: this.round(duration.segment.years()),
      months: this.round(duration.segment.months()),
      weeks: this.round(duration.segment.weeks()),
      days: this.round(duration.segment.days()),
      hours: this.round(duration.segment.hours()),
      minutes: this.round(duration.segment.minutes()),
    };
    let unitx = {
      years: this.round(duration.segment.asYears()),
      months: this.round(duration.segment.asMonths()),
      weeks: this.round(duration.segment.asWeeks()),
      days: this.round(duration.segment.asDays()),
      hours: this.round(duration.segment.asHours()),
      minutes: this.round(duration.segment.asMinutes()),
    };

    // Slices
    let slices = Array(counter)
      .fill().map((value, index) => index + 1)
      .reduce((accumulator, current, index) => {

        let previous = moment(accumulator[index].date);
        let date = previous.add(unitx.hours, "hours");
        accumulator.push({
          group: current,
          date: date.toDate(),
        });

        return accumulator;
      }, [{ group: 0, date: range.start }]);

    console.log(slices);

    // Render
    document.getElementById("span-nice").innerText = duration.span.humanize();
    document.getElementById("span-json").innerText = JSON.stringify(span, null, 2);
    document.getElementById("span-total").innerText = JSON.stringify(spanx, null, 2);
    document.getElementById("unit-nice").innerText = duration.segment.humanize();
    document.getElementById("unit-json").innerText = JSON.stringify(unit, null, 2);
    document.getElementById("unit-total").innerText = JSON.stringify(unitx, null, 2);

    // Rules
    if (spanx.years >= 1) {
      return { span: 'one-year+', format: "YYMM" };
    }
    else if (spanx.months >= 9) {
      return { span: 'nine-months+', format: "YYMM" };
    }
    else if (spanx.months >= 6) {
      return { span: 'six-months+', format: "YYWW" };
    }
    else if (spanx.months >= 3) {
      return { span: 'three-months+', format: "YYWW" };
    }
    else if (spanx.months >= 1) {
      return { span: 'one-month+', format: "YYMMDD" };
    }
    else if (spanx.weeks >= 3) {
      return { span: 'three-week+', format: "YYMMDD" };
    }
    else if (spanx.weeks >= 1) {
      return { span: 'one-week+', format: "YYMMDDHH" };
    }
    else if (spanx.days >= 1) {
      return { span: 'one-day+', format: "YYMMDDHH" };
    }
    else {
      return { span: 'one-day-', format: "YYMMDDHHmm" };
    }
  }

  clusters(data, range, temp) {
 
    // Groups
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

    // Scale
    var scale = this.scale(range);
    console.info(scale);
    console.debug(moment().format(scale.format));

    document.getElementById("rule-name").innerText = scale.span;
    document.getElementById("rule-format").innerText = scale.format;

    // Results
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