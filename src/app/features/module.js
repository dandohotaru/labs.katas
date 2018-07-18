import { SampleComponent } from "./kik0000/sample.component";
import { RecordsComponent } from "./kik0001/records.component";
import { NetworkComponent } from "./kik0002/network.component";
import { TimelineComponent } from "./kik0003/timeline.component";
import { ClustersComponent } from "./kik0004/clusters.component";
import { CanvasComponent } from "./kik0005/canvas.component";
import { FiltersComponent } from "./kik0006/filters.component";
import { HeadComponent } from "./kik0007/head.component";

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
        new NetworkComponent().init(this.outlet);
      })
      .on('/kik0003', () => {
        new TimelineComponent().init(this.outlet);
      })
      .on('/kik0004', () => {
        new ClustersComponent().init(this.outlet);
      })
      .on('/kik0005', () => {
        new CanvasComponent().init(this.outlet);
      })
      .on('/kik0006', () => {
        new FiltersComponent().init(this.outlet);
      })
      .on('/kik0007', () => {
        new HeadComponent().init(this.outlet);
      })
      .on('/kik0099', () => {
        console.log(`Todo: ${window.location.href}`);
      });

    this.router.updatePageLinks();
  }
}