
import 'bootstrap';
import Navigo from "navigo";
import { HeaderComponent } from "./app/layout/header/header.component";
import { FooterComponent } from "./app/layout/footer/footer.component";
import { TasksComponent } from "./app/demo/tasks/tasks.component";
import { PetsComponent } from "./app/demo/animals/animals.component";
import { ContactComponent } from "./app/demo/cards/cards.component";
import { AboutComponent } from "./app/demo/todos/todos.component";
import { ProfileComponent } from './app/demo/profile/profile.component';
import { TimelineComponent } from './app/demo/timeline/timeline.component';

var header = new HeaderComponent("header");
header.init();

var footer = new FooterComponent("footer");
footer.init();

var root = `${window.location.protocol}//${window.location.host}`;
var router = new Navigo(root);
console.log(root);

router
  .on(() => {
    new TasksComponent().init(".root");
  })
  .on('/', function () {
    new TasksComponent().init(".root");
  })
  .on('/about', function () {
    new AboutComponent("root").init();
  })
  .on('/contact', function () {
    new ContactComponent("root").init();
  })
  .on('/profile', function () {
    new ProfileComponent("root").init();
  })
  .on('/lolcatz', ()=> {
    new PetsComponent().init(".root");
  })
  .on('/timeline', () => {
    new TimelineComponent("root").init();
  })
  .resolve();
