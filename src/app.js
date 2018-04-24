
import 'bootstrap';
import Navigo from "navigo";

import { HeaderComponent } from "./app/layout/index";
import { FooterComponent } from "./app/layout/index";
import { LostComponent } from "./app/layout/index";
import { TasksComponent } from "./app/demo/index";
import { AnimalsComponent } from "./app/demo/index";
import { CardsComponent } from "./app/demo/index";
import { ToDosComponent } from "./app/demo/index";
import { ProfileComponent } from "./app/demo/index";
import { TimelineComponent } from "./app/demo/index";

export class Startup {

  router;
  content = ".root";
  header = "#header";
  footer = "#footer";

  constructor() {
    var root = `${window.location.protocol}//${window.location.host}`;
    this.router = new Navigo(root);
    console.log(root);
  }

  start() {
    new HeaderComponent().init(this.header);
    new FooterComponent().init(this.footer);

    this.router
      .on(() => {
        new TasksComponent().init(this.content);
      })
      .on('/', () => {
        new TasksComponent().init(this.content);
      })
      .on('/todos', () => {
        new ToDosComponent().init(this.content);
      })
      .on('/cards', () => {
        new CardsComponent().init(this.content);
      })
      .on('/profile', () => {
        new ProfileComponent().init(this.content);
      })
      .on('/animals', () => {
        new AnimalsComponent().init(this.content);
      })
      .on('/timeline', () => {
        new TimelineComponent().init(this.content);
      })
      .notFound(query => {
        new LostComponent().init(this.content);
        var url = window.location.href;
        console.warn(`Are you lost? (${url} )`)
      })
      .resolve();
  }
}

new Startup().start();

