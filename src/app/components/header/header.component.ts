import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  AfterContentInit,
  AfterViewInit,
  AfterViewChecked
} from "@angular/core";
import {
  CONFIG_SLIDER,
  CONFIG_SLIDER_HEADER
} from "src/app/service/slider.config";
import {
  SlickCarouselModule,
  SlickCarouselComponent
} from "ngx-slick-carousel";
import { BeachService } from "src/app/service/beach.service";
import Beach, { Shore } from "src/app/models/beach.model";
import { Observable, pipe, asapScheduler } from "rxjs";
import { map, tap, take, observeOn } from "rxjs/operators";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  providers: [ { provide: CONFIG_SLIDER, useValue: CONFIG_SLIDER_HEADER }]
  //   changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  beach: Beach;
  date = new Date();
  constructor(
    public beachService: BeachService,
    @Inject(CONFIG_SLIDER) public slideConfig,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.beachService.currentBeach
      .pipe(observeOn(asapScheduler))
      .subscribe(beach => {
        this.beach = beach;
        this.cd.detectChanges();
      });
  }

  trackBySlide(i) {
    return i;
  }
}
