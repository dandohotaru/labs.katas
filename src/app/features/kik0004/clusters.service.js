import moment from 'moment';

export class ClustersService {

  constructor() {
  }

  scale(start, end) {
    let counter = 50;
    let difference = moment(end).diff(moment(start));
    let duration = {
      range: moment.duration(difference),
      slice: moment.duration(difference / counter),
    };
    let range = {
      years: this.round(duration.range.years()),
      months: this.round(duration.range.months()),
      weeks: this.round(duration.range.weeks()),
      days: this.round(duration.range.days()),
      hours: this.round(duration.range.hours()),
      minutes: this.round(duration.range.minutes()),
    };
    let rangex = {
      years: this.round(duration.range.asYears()),
      months: this.round(duration.range.asMonths()),
      weeks: this.round(duration.range.asWeeks()),
      days: this.round(duration.range.asDays()),
      hours: this.round(duration.range.asHours()),
      minutes: this.round(duration.range.asMinutes()),
    };
    let slice = {
      years: this.round(duration.slice.years()),
      months: this.round(duration.slice.months()),
      weeks: this.round(duration.slice.weeks()),
      days: this.round(duration.slice.days()),
      hours: this.round(duration.slice.hours()),
      minutes: this.round(duration.slice.minutes()),
    };
    let slicex = {
      years: this.round(duration.slice.asYears()),
      months: this.round(duration.slice.asMonths()),
      weeks: this.round(duration.slice.asWeeks()),
      days: this.round(duration.slice.asDays()),
      hours: this.round(duration.slice.asHours()),
      minutes: this.round(duration.slice.asMinutes()),
    };

    document.getElementById("span-nice").innerText = duration.range.humanize();
    document.getElementById("span-json").innerText = JSON.stringify(range, null, 2);
    document.getElementById("span-total").innerText = JSON.stringify(rangex, null, 2);
    document.getElementById("unit-nice").innerText = duration.slice.humanize();
    document.getElementById("unit-json").innerText = JSON.stringify(slice, null, 2);
    document.getElementById("unit-total").innerText = JSON.stringify(slicex, null, 2);
  
    let slices = Array(counter)
      .fill()
      .reduce((results, current, index) => {
        let delta = moment.duration(difference / counter * index);
        let date = moment(start).add(delta).toDate();
        results.push({
          group: index,
          date: date,
        });
        return results;
      }, []);

    return slices;
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
    var scale = this.scale(range.start, range.end);
    console.log(scale);

    // Results
    var result = {};
    groups.forEach((items, i) => {
      items.forEach((item, j) => {
        let date = moment(item.start).toDate();
        let found = scale.find(p => p.date >= date);
        if (found) {
          //var index = moment(item.start).format(scale.format) + '-group' + item.group;
          var index = found.group + '-group' + item.group;

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
        };
      })
    });

    var temp = Object.keys(result).map(i => result[i]);
    return temp;
  }

  round(value){
    return Math.round(value * 10) / 10;
  }
}