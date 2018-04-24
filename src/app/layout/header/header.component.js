import { StaticComponent } from "../../shared/components/static.component";
import template from "./header.component.hbs";
import { EPIPE } from "constants";

export class HeaderComponent extends StaticComponent {
  constructor(selector) {
    super(selector, template);
  }

  init() {
    super.init();

    let items = document.querySelectorAll(".menu .navbar li");
    let anchors = document.querySelectorAll(".menu a[data-navigo]");

    Array.from(anchors).forEach(anchor => {
      anchor.addEventListener("click", event => {
        // Remove active from existing
        items.forEach(p => p.classList.remove("active"));

        // Append active for current
        let closest = anchor.closest("li");
        if (closest)
          closest.classList.add("active");

        console.log(`${anchor.href} clicked`);
      });
    });
  }
}