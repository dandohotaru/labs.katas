import { SampleComponent } from "./kik0000/sample.component";
import { RecordsComponent } from "./kik0001/records.component";
import { TimelineComponent } from "./kik0002/timeline.component";

export class FeaturesModule {

  router;
  outlet = ".root";

  constructor(router) {
    this.router = router;
  }

  register() {

    this.router
      .on('/kik0000', () => {
        new SampleComponent().init(this.outlet);
      })
      .on('/kik0001', () => {
        new RecordsComponent().init(this.outlet);
      })
      .on('/kik0002', () => {
        new TimelineComponent().init(this.outlet);
      })
      .on('/kik0003', () => {
        console.log(`Todo: ${window.location.href}`);
      });

    this.router.updatePageLinks();
  }
}