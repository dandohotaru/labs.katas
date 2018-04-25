import { TasksComponent } from "./tasks/tasks.component";
import { AnimalsComponent } from "./animals/animals.component";
import { CardsComponent } from "./cards/cards.component";
import { TodosComponent } from "./todos/todos.component";
import { ProfileComponent } from './profile/profile.component';
import { TimelineComponent } from './timeline/timeline.component';

export class DemoModule {

  router;
  content = ".root";

  constructor(router) {
    this.router = router;
  }

  register() {
    this.router
      .on('/tasks', () => {
        new TasksComponent().init(this.content);
      })
      .on('/todos', () => {
        new TodosComponent().init(this.content);
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
      });

    this.router.updatePageLinks();
  }
}