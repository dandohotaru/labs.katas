
import 'bootstrap';
import Navigo from "navigo";
import { HeaderComponent } from "./app/layout/header/header.component";
import { FooterComponent } from "./app/layout/footer/footer.component";
import { TasksComponent } from "./app/demo/tasks/tasks.component";
import { AnimalsComponent } from "./app/demo/animals/animals.component";
import { CardsComponent } from "./app/demo/cards/cards.component";
import { ToDosComponent } from "./app/demo/todos/todos.component";
import { ProfileComponent } from './app/demo/profile/profile.component';
import { TimelineComponent } from './app/demo/timeline/timeline.component';

new HeaderComponent().init("#header");
new FooterComponent().init("#footer");

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
  .on('/todos', function () {
    new ToDosComponent().init(".root");
  })
  .on('/cards', function () {
    new CardsComponent().init(".root");
  })
  .on('/profile', function () {
    new ProfileComponent().init(".root");
  })
  .on('/animals', ()=> {
    new AnimalsComponent().init(".root");
  })
  .on('/timeline', () => {
    new TimelineComponent().init(".root");
  })
  .resolve();
