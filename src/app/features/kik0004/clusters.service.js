import moment from 'moment';

export class ClustersService {

  constructor() {
  }

  slices(start, end, counter) {
    let difference = moment(end)
      .diff(moment(start));
      
    return Array(counter).fill()
      .reduce((results, current, index) => {
        let delta = moment.duration(difference / counter * index);
        let date = moment(start).add(delta).toDate();
        results.push({
          key: index,
          date: date,
        });
        return results;
      }, []);
  }

  clusters(data, start, end, counter) {
 
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
    var slices = this.slices(start, end, counter);

    // Results
    var result = {};
    groups.forEach((items, i) => {
      items.forEach((item, j) => {
        let date = moment(item.start).toDate();
        let found = slices.find(p => p.date >= date);
        if (found) {
          var index = found.key + '-group' + item.group;

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
}