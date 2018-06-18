import moment from 'moment';
import template from "./timeline.component.hbs";
import styles from "./timeline.component.css";
import records from "./records.json";
import { DataSet, Timeline } from 'vis/index-timeline-graph2d';
import 'vis/dist/vis-timeline-graph2d.min.css';
import { DataSet as NetworkSet, Network } from 'vis/index-network';
import 'vis/dist/vis-network.min.css';

export class TimelineComponent  {
  
  init(selector) {
    
    var container = document.querySelector(selector);
    container.innerHTML = template();

    var networkContainer = container.querySelector(".network");
    this.network(networkContainer);

    var timelineContainer = container.querySelector(".timeline");
    this.timeline(timelineContainer);
  }

  timeline(container) {
    var data = new DataSet([
      { id: 1, content: 'item 1', start: '2013-04-20' },
      { id: 2, content: 'item 2', start: '2013-04-14' },
      { id: 3, content: 'item 3', start: '2013-04-18' },
      { id: 4, content: 'item 4', start: '2013-04-16', end: '2013-04-19' },
      { id: 5, content: 'item 5', start: '2013-04-25' },
      { id: 6, content: 'item 6', start: '2013-04-27' }
    ]);
    var timeline = new Timeline(container, data, {});
  }

  network(container){
    var nodes = new NetworkSet([
      { id: 1, label: 'Node 1' },
      { id: 2, label: 'Node 2' },
      { id: 3, label: 'Node 3' },
      { id: 4, label: 'Node 4' },
      { id: 5, label: 'Node 5' }
    ]);

    var edges = new NetworkSet([
      { from: 1, to: 3 },
      { from: 1, to: 2 },
      { from: 2, to: 4 },
      { from: 2, to: 5 },
      { from: 3, to: 3 }
    ]);

    var data = {
      nodes: nodes,
      edges: edges
    };

    var options = {
      interaction: {
        navigationButtons: true
      }
    };

    var network = new Network(container, data, options);
  }
}