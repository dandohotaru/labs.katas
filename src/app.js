
import 'bootstrap';
import Navigo from "navigo";

import { HeaderComponent } from "./app/layout/index";
import { FooterComponent } from "./app/layout/index";
import { TasksComponent } from "./app/demo/index";
import { AnimalsComponent } from "./app/demo/index";
import { CardsComponent } from "./app/demo/index";
import { ToDosComponent } from "./app/demo/index";
import { ProfileComponent } from "./app/demo/index";
import { TimelineComponent } from "./app/demo/index";

export class Startup {

  router;

  constructor() {
    var root = `${window.location.protocol}//${window.location.host}`;
    this.router = new Navigo(root);
    console.log(root);
  }

  start() {
    new HeaderComponent().init("#header");
    new FooterComponent().init("#footer");

    this.router
      .on(() => {
        new TasksComponent().init(".root");
      })
      .on('/', () => {
        new TasksComponent().init(".root");
      })
      .on('/todos', () => {
        new ToDosComponent().init(".root");
      })
      .on('/cards', () => {
        new CardsComponent().init(".root");
      })
      .on('/profile', () => {
        new ProfileComponent().init(".root");
      })
      .on('/animals', () => {
        new AnimalsComponent().init(".root");
      })
      .on('/timeline', () => {
        new TimelineComponent().init(".root");
      })
      .notFound(query => {
        var url = window.location.href;
        console.warn(`Are you lost? (${url} )`)
      })
      .resolve();
  }
}

new Startup().start();

