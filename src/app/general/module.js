import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { LostComponent } from "./lost/lost.component";
import { HomeComponent } from "./home/home.component";

export class GeneralModule {

  router;
  header = ".header";
  content = ".root";
  footer = ".footer";

  constructor(router) {
    this.router = router;
  }

  register() {
    new HeaderComponent().init(this.header);
    new FooterComponent().init(this.footer);

    this.router
      .on(() => {
        new HomeComponent().init(this.content);
      })
      .notFound(query => {
        new LostComponent().init(this.content);
        var url = window.location.href;
        console.warn(`Are you lost? (${url} )`)
      });

    this.router.updatePageLinks();
  }
}