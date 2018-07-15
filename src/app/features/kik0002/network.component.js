import moment from 'moment';
import template from "./network.component.hbs";
import styles from "./network.component.css";
import records from "./records.json";

import { DataSet, Network } from 'vis';
import 'vis/dist/vis-network.min.css';

export class NetworkComponent {

  init(selector) {

    var container = document.querySelector(selector);
    container.innerHTML = template();

    var network = container.querySelector(".network");
    this.load(network);
  }

  load(element) {

    var data = {
      nodes: new DataSet(records.nodes),
      edges: new DataSet(records.edges),
    };

    var options = {
      interaction: {
        navigationButtons: true
      }
    };

    var network = new Network(element, data, options);
  }
}