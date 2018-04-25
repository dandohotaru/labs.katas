
import 'bootstrap';
import Navigo from "navigo";
import { LayoutModule } from './app/layout/module';
import { DemoModule } from "./app/demo/module";

export class Startup {

  router;

  constructor() {
    var root = `${window.location.protocol}//${window.location.host}`;
    this.router = new Navigo(root);
  }

  start() {
    new LayoutModule(this.router).register();
    new DemoModule(this.router).register();

    this.router.resolve();
  }
}

new Startup().start();

