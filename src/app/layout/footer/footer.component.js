import { StaticComponent } from "../../shared/components/static.component";
import template from "./footer.component.hbs";

export class FooterComponent extends StaticComponent {
  constructor(selector) {
    super(selector, template);
  }
}