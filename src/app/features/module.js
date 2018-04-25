import { SampleComponent } from "./kik0000/sample.component";

export class FeaturesModule {

  router;
  content = ".root";

  constructor(router) {
    this.router = router;
  }

  register() {

    this.router
      .on('/kik0000', () => {
        new SampleComponent().init(this.content);
      })
      .on('/kik0001', () => {
        console.log(`Todo: ${window.location.href}`);
      })
      .on('/kik0002', () => {
        console.log(`Todo: ${window.location.href}`);
      });

    this.router.updatePageLinks();
  }
}