import moment from 'moment';

export class ClustersService {

  constructor() {
  }

  slices(start, end, counter) {
    let difference = moment(end)
      .diff(moment(start));

    return Array(counter).fill()
      .reduce((results, current, index) => {
        let segment = difference / counter;
        let delta = moment.duration(segment * index);
        let date = moment(start).add(delta).toDate();

        results.push({
          key: index,
          date: date,
        });

        return results;
      }, []);
  }

  clusters(data, start, end, counter) {

    var slices = this.slices(start, end, counter);

    return data
      .reduce((results, current, index) => {

        let start = moment(current.start).toDate();
        let slice = slices.find(p => p.date >= start);
        if (!slice)
          return results;

        let key = `group-${current.group}-slice-${slice.key}`;
        let group = results.find(p => p.key == key);
        if (group) {
          group.count++;
          group.items.push({
            content: current.content,
          });
        }
        else {
          group = {
            count: 1,
            key: key,
            group: current.group,
            start: slice.date,
            items: [{
              content: current.content
            }]
          };
          results.push(group);
        }

        return results;
      }, []);
  }
}