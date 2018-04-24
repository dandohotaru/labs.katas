import template from "./tasks.component.hbs";
import { DynamicComponent } from "../shared/components/dynamic.component";

export class TasksComponent extends DynamicComponent {
  constructor(selector) {
    super(selector, template, "./src/app/tasks/tasks.component.json");
  }
}