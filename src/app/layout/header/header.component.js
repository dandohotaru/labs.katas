import { StaticComponent } from "../../shared/components/static.component";
import template from "./header.component.hbs";
import { EPIPE } from "constants";

export class HeaderComponent extends StaticComponent {
  constructor(selector) {
    super(selector, template);
  }

  init() {
    super.init();

    let items = document.querySelectorAll(".navbar li");
    let anchors = document.querySelectorAll("a[data-navigo]");

    anchors.forEach(anchor => {
      anchor.addEventListener("click", event => {
        items.forEach(p => p.classList.remove("active"));
        anchor.closest("li").classList.add("active");
        console.log(`${anchor.href} clicked`);
      });
    });
  }
}