import moment from 'moment';
import template from "./network.component.hbs";
import styles from "./network.component.css";
import records from "./records.json";

import { DataSet, Network } from 'vis/index-network';
import 'vis/dist/vis-network.min.css';

export class NetworkComponent {

  init(selector) {

    var container = document.querySelector(selector);
    container.innerHTML = template();

    var network = container.querySelector(".network");
    this.load(network);
  }

  load(element) {
    var nodes = new DataSet([
      { id: 1, label: 'Node 1' },
      { id: 2, label: 'Node 2' },
      { id: 3, label: 'Node 3' },
      { id: 4, label: 'Node 4' },
      { id: 5, label: 'Node 5' }
    ]);

    var edges = new DataSet([
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

    var network = new Network(element, data, options);
  }
}