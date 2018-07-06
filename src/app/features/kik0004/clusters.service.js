import moment from 'moment';

export class ClustersService {

  constructor() {
  }

  scale(range) {
    let start = moment(range.start);
    let end = moment(range.end);
    let difference = end.diff(start);
    let duration = moment.duration(difference);
    console.log(duration.as("days"));

    let unit = moment.duration(difference/100);
    console.log(unit.humanize());

    document.getElementById("range").innerText = duration.humanize();
    document.getElementById("unit").innerText = unit.humanize();



    if (duration.as("years") > 1) {
      return { span: 'year', format: "YYMM" };
    }
    else if (duration.as("months") > 3) {
      return { span: 'quarter', format: "YYMMWW" };
    }
    else if (duration.as("months") > 1) {
      return { span: 'month', format: "YYMMDD" };
    }
    else if (duration.as("weeks") > 1) {
      return { span: 'week', format: "YYMMDD" };
    }
    else if (duration.as("days") > 1) {
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