
import 'bootstrap';
import Navigo from "navigo";
import { TasksComponent } from "./app/tasks/tasks.component";
import { HeaderComponent } from "./app/layout/header/header.component";
import { FooterComponent } from "./app/layout/footer/footer.component";
import { PetsComponent } from "./app/sample/pets.component";
import { ContactComponent } from "./app/layout/contact/contact.component";
import { AboutComponent } from "./app/layout/about/about.component";
import { ProfileComponent } from './app/layout/profile/profile.component';
import { TimelineComponent } from './app/timeline/timeline.component';

var header = new HeaderComponent("header");
header.init();

var footer = new FooterComponent("footer");
footer.init();

var root = `${window.location.protocol}//${window.location.host}`;
var router = new Navigo(root);
console.log(root);

router
  .on(() => {
    new TasksComponent("root").init();
  })
  .on('/', function () {
    new TasksComponent("root").init();
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
    new PetsComponent("root").init();
  })
  .on('/samples/timeline', () => {
    new TimelineComponent("root").init();
  })
  .resolve();
