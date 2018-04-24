import template from "./pets.component.hbs";
import datasource from "./pets.component.json";
import { SimpleComponent } from "../shared/components/simple.component";

export class PetsComponent extends SimpleComponent {
  constructor(selector) {
    super(selector, template, datasource);
  }
}
