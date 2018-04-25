import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { LostComponent } from "./lost/lost.component";

export class LayoutModule {

  router;
  content = ".root";
  header = "#header";
  footer = "#footer";

  constructor(router) {
    this.router = router;
  }

  register() {
    new HeaderComponent().init(this.header);
    new FooterComponent().init(this.footer);

    this.router
      .notFound(query => {
        new LostComponent().init(this.content);
        var url = window.location.href;
        console.warn(`Are you lost? (${url} )`)
      });

    this.router.updatePageLinks();
  }
}