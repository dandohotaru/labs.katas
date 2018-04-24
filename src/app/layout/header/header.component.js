import template from "./header.component.hbs";
import styles from "./header.component.css";

export class HeaderComponent {

  init(selector) {
    var container = document.querySelector(selector);
    container.innerHTML = template();

    let items = document.querySelectorAll(".menu .navbar li");
    let anchors = document.querySelectorAll(".menu a[data-navigo]");

    anchors.forEach(anchor => {
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